import { ConfigurationFormState } from './form.model';
import {
    actionFormReset,
    actionFormUpdate,
    actionFormUpdateConfigurationName,
    actionFormUpdateRootObjects
} from './form.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: ConfigurationFormState = {
    formValue: {},
    rootObjectClassNames: [],
    configurationName: 'example_name'
};

const reducer = createReducer(
    initialState,
    on(actionFormUpdate, (state, { formValue }) => ({ ...state, formValue })),
    on(actionFormReset, state => ({ ...state, formValue: {} })),
    on(actionFormUpdateRootObjects, (state, { rootObjectClassNames }) => ({ ...state, rootObjectClassNames })),
    on(actionFormUpdateConfigurationName, (state, { configurationName }) => ({ ...state, configurationName }))
);

export function formReducer(state: ConfigurationFormState | undefined, action: Action) {
    return reducer(state, action);
}
