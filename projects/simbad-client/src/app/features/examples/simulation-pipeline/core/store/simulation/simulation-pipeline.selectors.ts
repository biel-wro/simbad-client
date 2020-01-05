import { createSelector } from '@ngrx/store';
import {
    selectSimulationPipelineState
} from '../../../../simulationState';

export const selectCliStepState = createSelector(
    selectSimulationPipelineState,
    (state) => state.simulation ? state.simulation.steps.find((step) => step.origin === 'CLI') : undefined
);

export const selectSimulationSteps = createSelector(
    selectSimulationPipelineState,
    (state) => state.simulation ? state.simulation.steps : []
);

export const simulationStepState = (origin: string) => createSelector(
    selectSimulationSteps,
    (steps) => steps.find((step) => step.origin === origin)
);

export const simulationStepArtifacts = (origin: string) => createSelector(
    simulationStepState(origin),
    (step) => step.artifacts
);

export const cliStepState = createSelector(
    selectSimulationPipelineState,
    (state) => state.cliStep
);

export const cliStepStatus = createSelector(
    cliStepState,
    (state) => state ? state.status : 'PENDING'
);

export const analyzerStepState = createSelector(
    selectSimulationPipelineState,
    (state) => state.analyzerStep
);

export const analyzerStepStatus = createSelector(
    analyzerStepState,
    (state) => state ? state.status : 'PENDING'
);

export const reportStepState = createSelector(
    selectSimulationPipelineState,
    (state) => state.reportsStep
);

export const reportStepStatus = createSelector(
    reportStepState,
    (state) => state ? state.status : 'PENDING'
);

export const cliStepStartTimestamp = createSelector(
    cliStepState,
    (state) => state ? state.startedUtc : undefined
);

export const cliStepEndTimestamp = createSelector(
    cliStepState,
    (state) => state ? state.finishedUtc : undefined
);

export const analyzerStepStartTimestamp = createSelector(
    analyzerStepState,
    (state) => state ? state.startedUtc : undefined
);

export const analyzerStepEndTimestamp = createSelector(
    analyzerStepState,
    (state) => state ? state.finishedUtc : undefined
);

export const reportStepStartTimestamp = createSelector(
    reportStepState,
    (state) => state ? state.startedUtc : undefined
);

export const reportStepEndTimestamp = createSelector(
    reportStepState,
    (state) => state ? state.finishedUtc : undefined
);

export const isSimulationOngoing = createSelector(
    selectSimulationPipelineState,
    (state) => state.isSimulationRunning
);

export const simulationStepStartTimestamp = (origin: string) => createSelector(
    simulationStepState(origin),
    (step) => step.startedUtc
);

export const simulationStepRuntimeInfo = (origin: string) => createSelector(
    simulationStepState(origin),
    (step) => {
        switch (origin) {
            case 'ANALYZER':
                return step.analyzerRuntimeInfo;
            default:
                return step.cliRuntimeInfo;
        }
    }
);

