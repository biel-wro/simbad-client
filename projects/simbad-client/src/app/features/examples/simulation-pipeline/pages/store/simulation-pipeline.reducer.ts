import { Action, createReducer, on } from '@ngrx/store';
import { SimulationInfo } from '@simbad-cli-api/gen/models/simulation-info';
import {
    simulationStepFinished,
    startSimulation,
    updateCliStepInfo,
    updateSimulationInfo,
    updateStepInfo
} from './simulation-pipeline.actions';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';

export interface SimulationPipelineState {
    isSimulationRunning: boolean,
    simulation?: SimulationInfo;
    cliStep?: SimulationStepInfo,
    analyzerStep?: SimulationStepInfo
}


export const initialState: SimulationPipelineState = {
    isSimulationRunning: false,
};

const reducer = createReducer(
    initialState,
    on(startSimulation, (state) => ({...state, isSimulationRunning: true})),
    on(updateSimulationInfo, (state, { simulation }) => ({ ...state, simulation })),
    on(updateCliStepInfo, (state, {step}) => ({...state, cliStep: step})),
    on(simulationStepFinished, (state, {step}) => ({...state, cliStep: step})),
    on(updateStepInfo, (state, { step }) => {
        const newSteps = state.simulation.steps.map((currentStep) => {
            return currentStep.id === step.id ? step : currentStep;
        });
        const simulation = {...state.simulation, steps: newSteps};
        return ({ ...state, simulation });
    }),
);


export function simulationPipelineReducer(state: SimulationPipelineState | undefined, action: Action): SimulationPipelineState {
    return reducer(state, action);
}
