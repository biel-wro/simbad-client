import { cliTaskFinished, updateCliTaskId, updateCliTaskStatus, updateElapsedTime } from './cli-step.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { CliTaskStatus } from '@simbad-cli-api/gen/models/cli-task-status';

export interface CliStepState {
    cliTaskId?: string;
    cliTaskStatus?: CliTaskStatus;
    elapsedTime: number;
}


export const initialState: CliStepState = {
    elapsedTime: 0
};

const reducer = createReducer(
    initialState,
    on(updateCliTaskId, (state, { taskId }) => ({ ...state, currentTaskId: taskId })),
    on(updateCliTaskStatus, (state, { status }) => ({ ...state, cliTaskStatus: status })),
    on(updateElapsedTime, (state, { time }) => {
        const elapsedTime = time - state.cliTaskStatus.startTimestamp;
        console.log('Reducer elapsed time', time, elapsedTime);
        return { ...state, elapsedTime };
    }),
    on(cliTaskFinished, (state, { result, finishedTimestamp }) => ({
        ...state,
        cliTaskStatus: {
            ...state.cliTaskStatus,
            result,
            finishedTimestamp
        }
    }))
);


export function cliStepReducer(state: CliStepState | undefined, action: Action): CliStepState {
    return reducer(state, action);
}
