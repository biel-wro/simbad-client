import { Action, createReducer, on } from '@ngrx/store';
import { SimulationInfo } from '@simbad-cli-api/gen/models/simulation-info';
import {
    analyzerStepFinished,
    cliStepFinished,
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
    on(cliStepFinished, (state, {step}) => ({...state, cliStep: step})),
    on(analyzerStepFinished, (state, {step}) => ({...state, analyzerStep: step})),
    on(updateStepInfo, (state, { step }) => {
        switch (step.origin) {
            case 'ANALYZER':
                return ({ ...state, analyzerStep: step});
            case 'CLI':
                return ({...state, cliStep: step});
            default:
                return state;
        }
    }),
);


export function simulationPipelineReducer(state: SimulationPipelineState | undefined, action: Action): SimulationPipelineState {
    return reducer(state, action);
}
