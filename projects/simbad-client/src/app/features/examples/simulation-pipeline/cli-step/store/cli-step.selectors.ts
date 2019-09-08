import { createSelector } from '@ngrx/store';
import { selectCliStepState } from '@simbad-client/app/features/examples/simulationState';
import { CliStepState } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/store/cli-step.reducer';

export const selectCliTaskStatus = createSelector(
    selectCliStepState,
    (state: CliStepState) => state.cliTaskStatus
);

export const selectElapsedTime = createSelector(
    selectCliStepState,
    (state: CliStepState) => state.elapsedTime
);


export const selectStartTimestamp = createSelector(
    selectCliStepState,
    (state: CliStepState) => state.cliTaskStatus ? state.cliTaskStatus.startTimestamp : undefined
);
