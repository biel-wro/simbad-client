import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';
import { formReducer } from './configuration-editor/store/form.reducer';
import { ConfigurationFormState } from './configuration-editor/store/form.model';

export const FEATURE_NAME = 'examples';
export const selectExamples = createFeatureSelector<State, ExamplesState>(FEATURE_NAME);
export const reducers: ActionReducerMap<ExamplesState> = {
    form: formReducer
};

export interface ExamplesState {
    form: ConfigurationFormState;
}

export interface State extends AppState {
    examples: ExamplesState;
}
