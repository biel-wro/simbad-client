import { createSelector } from '@ngrx/store';
import {
    selectSimulationPipelineState,
} from '@simbad-client/app/features/examples/simulationState';

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

export const analyzerStepState = createSelector(
    selectSimulationPipelineState,
    (state) => state.analyzerStep
);

export const cliStepStartTimestamp = createSelector(
    cliStepState,
    (state) => state ? state.startedUtc : undefined
);

export const analyzerStepStartTimestamp = createSelector(
    analyzerStepState,
    (state) => state ? state.startedUtc : undefined
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

