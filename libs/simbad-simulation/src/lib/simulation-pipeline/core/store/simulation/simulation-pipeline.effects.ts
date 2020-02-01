import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { HostService } from '@simbad-host-api/gen';

import { PollingService } from '@simbad-client/app/core/polling/polling.service';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { SimulationInfo } from '@simbad-cli-api/gen/models/simulation-info';
import {
    analyzerStepFinished,
    cliStepFinished,
    getSimulationStepInfo, loadLatestSimulation,
    pollForSimulationStepInfo, redirectAndStart,
    reportStepFinished,
    setLatestSimulation,
    simulationError,
    startSimulation, simulationStepFailed, updateStepInfo
} from './simulation-pipeline.actions';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';
import { SimulationService, StatusService } from '@simbad-cli-api/gen';
import { select, Store } from '@ngrx/store';
import { selectConfiguration } from '@simbad-simulation/lib/configuration-editor/store/form.selectors';
import { FormsService } from '@simbad-simulation/lib/configuration-editor/services/forms.service';
import { routerReducer } from '@ngrx/router-store';
import { Router } from '@angular/router';

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

    redirectAndStart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(redirectAndStart),
            withLatestFrom(
                this.store.pipe(
                    select(selectConfiguration),
                    filter(configuration => !!configuration.formValue),
                    map(({ formValue, name }) => {
                        return {
                            value: this.fs.formValueToConfiguration(formValue),
                            name
                        };
                    })
                )
            ),
            map(([, conf]) => startSimulation({
                request: {
                    configuration: conf.value as any,
                    configurationName: conf.name
                }
            })),
            tap(() => this.router.navigate(['/examples/simulation-pipeline']))
        );
    });

    getSimulationStepInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getSimulationStepInfo),
            tap((value) => console.log('getSimulationStepInfo$: ', value)),
            switchMap(({ stepId }) => this.statusService.getSimulationStepInfo({ id: stepId }).pipe(
                concatMap((stepInfo) => {
                    if (stepInfo.status === 'FAILURE') {
                        return of(simulationStepFailed({step: stepInfo}));
                    }

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

    simulationStepFailed$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(simulationStepFailed),
            tap((action) => {
                switch (action.step.origin) {
                    case 'ANALYZER':
                        this.notificationService.error('Analyzer step failed!');
                        break;
                    case 'CLI':
                        this.notificationService.error('CLI step failed!');
                        break;
                    case 'REPORT':
                        this.notificationService.error('Report step failed!');
                        break;
                }
                this.stopPolling$.next();
            })
        );
    }, { dispatch: false });

    pollForStepInfoChange$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(pollForSimulationStepInfo),
            tap((value) => console.log('pollForStepInfoChange$: ', value)),
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
            tap((value) => console.log('startAnalyzerStep$: ', value)),
            switchMap((action) => this.statusService.getSimulationInfo({ id: action.step.simulationId.toString(10) }).pipe(
                tap(() => this.notificationService.info(`Started analyzer step`)),
                concatMap((response: SimulationInfo) => {
                    const analyzerStep: SimulationStepInfo = response.steps.find((step) => step.origin === 'ANALYZER');
                    console.log('foundAnalyzerStep', analyzerStep);
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
        private store: Store<{}>,
        private router: Router,
        private fs: FormsService,
        private statusService: StatusService,
        private simulationService: SimulationService,
        private hostService: HostService,
        private notificationService: NotificationService,
        private pollingService: PollingService) {
    }

}
