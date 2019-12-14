import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { HostService } from '@simbad-host-api/gen';

import { PollingService } from '@simbad-client/app/core/polling/polling.service';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { SimulationInfo } from '@simbad-cli-api/gen/models/simulation-info';
import {
    analyzerStepFinished,
    cliStepFinished,
    getSimulationStepInfo, loadLatestSimulation,
    pollForSimulationStepInfo,
    reportStepFinished,
    setLatestSimulation,
    simulationError,
    startSimulation, updateStepInfo
} from './simulation-pipeline.actions';
import { SimulationService, StatusService } from '../../../../../../../../../../libs/simbad-cli-api/src/gen';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';

const POLLING_PERIOD_MS = 3000;

@Injectable()
export class SimulationPipelineEffects {
    loadLatestSimulation$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadLatestSimulation),
            switchMap(() => this.statusService.getLatestSimulation().pipe(
                concatMap((response: SimulationInfo) => {
                    return response.finishedUtc
                        ? [ setLatestSimulation({ simulation: response })]
                        : [
                            setLatestSimulation({ simulation: response }),
                            pollForSimulationStepInfo({ stepId: response.currentStepId })
                        ];
                }),
                catchError((err) => {
                    console.log('loadLatestSimulation$: ', err);
                    return of(simulationError({ error: err }));
                })
            ))
        );
    });

    startSimulation$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(startSimulation),
            switchMap((action) => this.simulationService.startSimulation({ body: action.request }).pipe(
                tap(() => this.notificationService.info(`Started simulation pipeline with conf: ${action.request.configurationName}`)),
                concatMap((response: SimulationStepInfo) => [
                    updateStepInfo({ step: response }),
                    pollForSimulationStepInfo({ stepId: response.id })
                ]),
                catchError((err) => {
                    console.log('startSimulation$: ', err);
                    return of(simulationError({ error: err }));
                })
            ))
        );
    });

    getSimulationStepInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getSimulationStepInfo),
            switchMap(({ stepId }) => this.statusService.getSimulationStepInfo({ id: stepId }).pipe(
                concatMap((stepInfo) => {
                    console.log('SimulationStepInfo', stepInfo);
                    if (stepInfo.finishedUtc) {
                        switch (stepInfo.origin) {
                            case 'ANALYZER':
                                return of(analyzerStepFinished({ step: stepInfo }));
                            case 'CLI':
                                return of(cliStepFinished({ step: stepInfo }));
                            case 'REPORT':
                                return of(reportStepFinished({ step: stepInfo }));
                        }
                    }

                    return of(updateStepInfo({ step: stepInfo }));
                }),
                catchError((err) => {
                    console.log('getStimulationStepInfo: ', err);
                    return of(simulationError({ error: err }));
                })
            ))
        );
    });

    stopPolling$ = new Subject();

    cliStepFinished$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cliStepFinished, analyzerStepFinished, reportStepFinished),
            tap((action) => {
                switch (action.step.origin) {
                    case 'ANALYZER':
                        this.notificationService.success('Analyzer step finished!');
                        break;
                    case 'CLI':
                        this.notificationService.success('CLI step finished!');
                        break;
                    case 'REPORT':
                        this.notificationService.success('Report step finished!');
                        break;
                }
                this.stopPolling$.next();
            })
        );
    }, { dispatch: false });

    pollForStepInfoChange$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(pollForSimulationStepInfo),
            switchMap((action) => {
                return this.pollingService.getTimer(0, POLLING_PERIOD_MS).pipe(
                    takeUntil(this.stopPolling$),
                    map(() => getSimulationStepInfo({ stepId: action.stepId })),
                    catchError((err) => {
                        console.log('pollForStepInfoChange$: ', err);
                        return of(simulationError({ error: err }));
                    })
                );
            })
        );
    });

    startAnalyzerStep$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cliStepFinished),
            switchMap((action) => this.statusService.getSimulationInfo({ id: action.step.simulationId.toString(10) }).pipe(
                tap(() => this.notificationService.info(`Started analyzer step`)),
                concatMap((response: SimulationInfo) => {
                    const analyzerStep: SimulationStepInfo = response.steps.find((step) => step.origin === 'ANALYZER');
                    return [
                        updateStepInfo({ step: analyzerStep }),
                        pollForSimulationStepInfo({ stepId: analyzerStep.id })
                    ];
                })
            ))
        );
    });

    startReportStep$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(analyzerStepFinished),
            switchMap((action) => this.statusService.getSimulationInfo({ id: action.step.simulationId.toString(10) }).pipe(
                tap(() => this.notificationService.info(`Started report step`)),
                concatMap((response: SimulationInfo) => {
                    const analyzerStep: SimulationStepInfo = response.steps.find((step) => step.origin === 'REPORT');
                    return [
                        updateStepInfo({ step: analyzerStep }),
                        pollForSimulationStepInfo({ stepId: analyzerStep.id })
                    ];
                })
            ))
        );
    });

    constructor(
        private actions$: Actions,
        private statusService: StatusService,
        private simulationService: SimulationService,
        private hostService: HostService,
        private notificationService: NotificationService,
        private pollingService: PollingService) {
    }

}