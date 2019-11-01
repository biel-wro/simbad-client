import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap, takeUntil } from 'rxjs/operators';
import {
    checkForRunningCliTask,
    cliTaskFinished,
    cliTaskHttpError,
    fetchCliTaskStatus,
    openArtifact,
    pollForCliTaskStatusChange,
    startCliTask,
    startTimer,
    stopPollingForTaskStatusChange,
    stopTimer,
    updateCliTaskStatus,
    updateElapsedTime
} from './cli-step.actions';
import { CliService } from '@simbad-cli-api/gen';
import { CliStatus } from '@simbad-cli-api/gen/models/cli-status';
import { interval, of } from 'rxjs';
import { PollingService } from '@simbad-client/app/core/polling/polling.service';
import { HostService } from '@simbad-host-api/gen';

const POLLING_PERIOD_MS = 1000;

@Injectable()
export class CliStepEffects {

    checkForRunningCliTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(checkForRunningCliTask),
            switchMap(() => this.cliService.getCliStatus().pipe(
                map((response: CliStatus) => {
                    return response.status === 'BUSY'
                        ? pollForCliTaskStatusChange({ taskId: response.taskId })
                        : { type: 'EMPTY_ACTION' };
                }),
                catchError((err) => of(cliTaskHttpError({ errorResponse: err })))
            ))
        );
    });

    startTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(startCliTask),
            switchMap((action) => this.cliService.runCliCommand({ body: action.request }).pipe(
                concatMap((response) => [
                    startTimer(),
                    pollForCliTaskStatusChange({ taskId: response.taskId })
                ])
            ))
        );
    });

    cliTaskFinished$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cliTaskFinished),
            concatMap(() => [
                stopTimer(),
                stopPollingForTaskStatusChange()
            ])
        );
    });

    fetchCliTaskStatus$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fetchCliTaskStatus),
            switchMap(({ taskId }) => this.cliService.getCliTaskStatus({ taskId: taskId })),
            map((status) => {
                return status.result ? cliTaskFinished({
                    result: status.result,
                    finishedTimestamp: Date.now()
                }) : updateCliTaskStatus({ status });
            })
        );
    });

    stopPollingForCliTaskStatusChange$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(stopPollingForTaskStatusChange)
        );
    }, { dispatch: false });

    pollForCliTaskStatusChange$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(pollForCliTaskStatusChange),
            switchMap((action) => {
                return this.pollingService.getTimer(0, POLLING_PERIOD_MS).pipe(
                    takeUntil(this.stopPollingForCliTaskStatusChange$),
                    map(() => fetchCliTaskStatus({ taskId: action.taskId }))
                );
            })
        );
    });

    stopTimer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(stopTimer)
        );
    }, { dispatch: false });

    startTimer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(startTimer),
            switchMap(() => {
                return interval(1000).pipe(
                    takeUntil(this.stopTimer$),
                    map(() => updateElapsedTime({ time: Date.now() }))
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
        private cliService: CliService,
        private hostService: HostService,
        private pollingService: PollingService) {
    }

}
