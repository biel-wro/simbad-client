import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { HostService } from '@simbad-host-api/gen';
import { SimulationStatus } from '@simbad-cli-api/gen/models/simulation-status';
import {
    analyzerStepFinished,
    checkForRunningSimulation,
    cliStepFinished,
    downloadArtifact,
    getSimulationStepInfo, loadLatestSimulation,
    openArtifact,
    pollForSimulationStatusChange,
    pollForSimulationStepInfo, reportStepFinished,
    simulationError,
    startSimulation,
    updateCliStepInfo,
    updateStepInfo
} from '@simbad-client/app/features/examples/simulation-pipeline/pages/store/simulation-pipeline.actions';
import { SimulationService, StatusService } from '@simbad-cli-api/gen';
import { PollingService } from '@simbad-client/app/core/polling/polling.service';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';
import { SimulationInfo } from '@simbad-cli-api/gen/models/simulation-info';

const POLLING_PERIOD_MS = 3000;

@Injectable()
export class SimulationPipelineEffects {
    checkForRunningSimulation$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(checkForRunningSimulation),
            switchMap(() => this.statusService.getSimulationStatus().pipe(
                map((response: SimulationStatus) => {
                    return response.status === 'BUSY'
                        ? pollForSimulationStatusChange({ simulationId: response.simulationId })
                        : { type: 'EMPTY_ACTION' };
                }),
                catchError((err) => {
                    console.log('checkForRunningSimulation$: ', err);
                    return of(simulationError({ error: err }));
                })
            ))
        );
    });

    loadLatestSimulation$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(checkForRunningSimulation),
            switchMap(() => this.statusService.getLatestSimulation().pipe(
                map((response: SimulationInfo) => {
                    return loadLatestSimulation({ simulation: response });
                }),
                catchError((err) => {
                    console.log('loadLatestSimulation$: ', err);
                    return of(simulationError({ error: err }));
                })
            )),
            take(1)
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
                tap(() => this.notificationService.info(`Started analyzer step`)),
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

    openArtifact$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(openArtifact),
            switchMap((action) => {
                console.log('Action: ', action);
                return this.hostService.openLocation({ body: { path: action.path } }).pipe(
                    map((response) => {
                        console.log('Response: ', response);
                        return of();
                    })
                );
            })
        );
    }, { dispatch: false });

    downloadArtifact$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(downloadArtifact),
            tap((action) => {
                this.notificationService.info(`${action.name} download started.`);
            }),
            switchMap((action) => {
                console.log('Action: ', action);
                return this.statusService.downloadArtifact({ id: action.id }).pipe(
                    map((response) => {
                        const downloadURL = window.URL.createObjectURL(response);
                        const link = document.createElement('a');
                        link.href = downloadURL;
                        link.download = action.name.endsWith('.png') ? action.name : action.name + '.zip';
                        link.click();
                        return of();
                    }),
                    tap(() => this.notificationService.success(`${action.name} download finished.`))
                );
            })
        );
    }, { dispatch: false });

    constructor(
        private actions$: Actions,
        private statusService: StatusService,
        private simulationService: SimulationService,
        private hostService: HostService,
        private notificationService: NotificationService,
        private pollingService: PollingService) {
    }

}
