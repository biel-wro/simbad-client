import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';
import { formReducer } from './configuration-editor/store/form.reducer';
import { ConfigurationFormState } from './configuration-editor/store/form.model';
import {
    cliStepReducer,
    CliStepState
} from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/store/cli-step.reducer';

export const FEATURE_NAME = 'examples';
export const selectSimulationState = createFeatureSelector<State, SimulationState>(FEATURE_NAME);

export const selectCliStepState = createSelector(
    selectSimulationState,
    (state: SimulationState) => state.cliStep
);
export const reducers: ActionReducerMap<SimulationState> = {
    form: formReducer,
    cliStep: cliStepReducer
};

export interface SimulationState {
    form: ConfigurationFormState;
    cliStep: CliStepState
}

export interface State extends AppState {
    examples: SimulationState;
}
