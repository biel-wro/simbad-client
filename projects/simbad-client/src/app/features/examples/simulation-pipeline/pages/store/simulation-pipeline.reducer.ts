import { Action, createReducer, on } from '@ngrx/store';
import { SimulationInfo } from '@simbad-cli-api/gen/models/simulation-info';
import {
    analyzerStepFinished,
    cliStepFinished, loadLatestSimulation, reportStepFinished,
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
    reportsStep?: SimulationStepInfo
}


export const initialState: SimulationPipelineState = {
    isSimulationRunning: false,
};

const reducer = createReducer(
    initialState,
    on(startSimulation, (state) => ({...state, isSimulationRunning: true, cliStep: undefined, analyzerStep: undefined, reportsStep: undefined})),
    on(updateSimulationInfo, (state, { simulation }) => ({ ...state, simulation })),
    on(updateCliStepInfo, (state, {step}) => ({...state, cliStep: step})),
    on(cliStepFinished, (state, {step}) => ({...state, cliStep: step})),
    on(analyzerStepFinished, (state, {step}) => ({...state, analyzerStep: step})),
    on(reportStepFinished, (state, {step}) => ({...state, reportsStep: step, isSimulationRunning: false})),
    on(updateStepInfo, (state, { step }) => {
        switch (step.origin) {
            case 'ANALYZER':
                return ({ ...state, analyzerStep: step});
            case 'CLI':
                return ({...state, cliStep: step});
            case 'REPORT':
                return ({...state, reportsStep: step});
            default:
                return state;
        }
    }),
    on(loadLatestSimulation, (state, { simulation }) => {
        const analyzerStep: SimulationStepInfo = simulation.steps.find((step) => step.origin === 'ANALYZER');
        const cliStep: SimulationStepInfo = simulation.steps.find((step) => step.origin === 'CLI');
        const reportsStep: SimulationStepInfo = simulation.steps.find((step) => step.origin === 'REPORT');
        return { ...state, cliStep, analyzerStep, reportsStep };
    }),
);


export function simulationPipelineReducer(state: SimulationPipelineState | undefined, action: Action): SimulationPipelineState {
    return reducer(state, action);
}
