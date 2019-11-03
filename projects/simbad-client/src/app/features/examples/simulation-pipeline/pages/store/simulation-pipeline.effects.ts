import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { HostService } from '@simbad-host-api/gen';
import { SimulationStatus } from '@simbad-cli-api/gen/models/simulation-status';
import {
    checkForRunningSimulation,
    getSimulationStepInfo, openArtifact,
    pollForSimulationStatusChange,
    pollForSimulationStepInfo,
    simulationError,
    simulationStepFinished,
    startSimulation, updateCliStepInfo,
    updateStepInfo
} from '@simbad-client/app/features/examples/simulation-pipeline/pages/store/simulation-pipeline.actions';
import { SimulationService, StatusService } from '@simbad-cli-api/gen';
import { PollingService } from '@simbad-client/app/core/polling/polling.service';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';

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

    startSimulation$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(startSimulation),
            switchMap((action) => this.simulationService.startSimulation({ body: action.request }).pipe(
                tap(() => this.notificationService.info(`Started simulation pipeline with conf: ${action.request.configurationName}`)),
                concatMap((response: SimulationStepInfo) => [
                    updateCliStepInfo({ step: response }),
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
                    return of(stepInfo.finishedUtc
                        ? simulationStepFinished({ step: stepInfo })
                        : updateCliStepInfo({ step: stepInfo })
                    );
                }),
                catchError((err) => {
                    console.log('getStimulationStepInfo: ', err);
                    return of(simulationError({ error: err }));
                })
            ))
        );
    });

    stopPolling$ = new Subject();

    simulationStepFinished$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(simulationStepFinished),
            tap(() => {
                this.notificationService.success('CLI step finished');
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

    openArtifact$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(openArtifact),
            switchMap((action) => {
                console.log('Action: ', action);
                return this.hostService.openLocation({ body: { path: action.path } }).pipe(
                    map((response) => {
                        console.log('Response: ', response);
                    })
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
