import { ConfigurationFormState } from './form.model';
import { resetFormValue, updateFormValue, updateConfigurationName, updateFormRootObjects } from './form.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: ConfigurationFormState = {
    formValue: {},
    rootObjectClassNames: [],
    configurationName: 'example_name'
};

const reducer = createReducer(
    initialState,
    on(updateFormValue, (state, { formValue }) => ({ ...state, formValue })),
    on(resetFormValue, state => ({ ...state, formValue: {} })),
    on(updateFormRootObjects, (state, { rootObjectClassNames }) => ({ ...state, rootObjectClassNames })),
    on(updateConfigurationName, (state, { configurationName }) => ({ ...state, configurationName }))
);

export function formReducer(state: ConfigurationFormState | undefined, action: Action) {
    return reducer(state, action);
}
