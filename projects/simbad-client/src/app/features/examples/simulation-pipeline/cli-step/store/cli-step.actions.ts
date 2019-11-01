import { createAction, props } from '@ngrx/store';
import { CliTaskStatus } from '@simbad-cli-api/gen/models/cli-task-status';
import { CliResult } from '@simbad-cli-api/gen/models/cli-result';
import { RunCliCommandRequest } from '@simbad-cli-api/gen/models/run-cli-command-request';
import { HttpErrorResponse } from '@angular/common/http';


export enum CliTaskActionTypes {
    CheckForRunningCliTask = '[SimulationPipeline] Check if CLI task is running',
    UpdateCliTaskId = '[SimulationPipeline] Update CLI task id',
    FetchCliTaskStatus = '[SimulationPipeline] Fetch CLI task status',
    CliTaskFinished = '[SimulationPipeline] Cli task finished',
    UpdateCliTaskStatus = '[SimulationPipeline] Update CLI task status',
    PollForCliStatus = '[SimulationPipeline] Poll for CLI task status changes',
    StartCliTask = '[SimulationPipeline] Start CLI task',
    StopPollingForTaskStatusChange = '[SimulationPipeline] Stop polling',
    CliTaskHttpError = '[SimulationPipeline] CLI task http error',
    UpdateElapsedTime = '[SimulationPipeline] Update elapsed time',
    StartTimer = '[SimulationPipeline] Start timer',
    StopTimer = '[SimulationPipeline] Stop timer',
    OpenArtifact = '[SimulationPipeline] Open artifact'
}


export const checkForRunningCliTask = createAction(CliTaskActionTypes.CheckForRunningCliTask);

export const fetchCliTaskStatus = createAction(
    CliTaskActionTypes.FetchCliTaskStatus,
    props<{ taskId: string }>()
);

export const pollForCliTaskStatusChange = createAction(
    CliTaskActionTypes.PollForCliStatus,
    props<{ taskId: string }>()
);

export const updateCliTaskId = createAction(
    CliTaskActionTypes.UpdateCliTaskId,
    props<{ taskId: string }>()
);

export const updateCliTaskStatus = createAction(
    CliTaskActionTypes.UpdateCliTaskStatus,
    props<{ status: CliTaskStatus }>()
);

export const cliTaskFinished = createAction(
    CliTaskActionTypes.CliTaskFinished,
    props<{ result: CliResult, finishedTimestamp: number }>()
);

export const startCliTask = createAction(
    CliTaskActionTypes.StartCliTask,
    props<{ request: RunCliCommandRequest }>()
);

export const stopPollingForTaskStatusChange = createAction(
    CliTaskActionTypes.StopPollingForTaskStatusChange
);

export const cliTaskHttpError = createAction(
    CliTaskActionTypes.CliTaskHttpError,
    props<{ errorResponse: HttpErrorResponse }>()
);

export const updateElapsedTime = createAction(
    CliTaskActionTypes.UpdateElapsedTime,
    props<{ time: number }>()
);

export const startTimer = createAction(
    CliTaskActionTypes.StartTimer
);

export const stopTimer = createAction(
    CliTaskActionTypes.StopTimer
);

export const openArtifact = createAction(
    CliTaskActionTypes.OpenArtifact,
    props<{ path: string }>()
);

