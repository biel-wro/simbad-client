import { createAction, props } from '@ngrx/store';

export enum FormActionTypes {
    UpdateFormValue = '[Form] Update',
    ResetFormValue = '[Form] Reset',
    UpdateRootObjects = '[Form] Update root objects',
    UpdateConfigurationName = '[Form] Update configuration name'
}

export const updateFormValue = createAction(FormActionTypes.UpdateFormValue, props<{ formValue: any }>());

export const updateConfigurationName = createAction(
    FormActionTypes.UpdateConfigurationName,
    props<{ configurationName: string }>()
);

export const updateFormRootObjects = createAction(
    FormActionTypes.UpdateRootObjects,
    props<{ rootObjectClassNames: string[] }>()
);

export const buildFormFromFile = createAction(
    FormActionTypes.UpdateRootObjects,
    props<{ rootObjectClassNames: string[]; formValue: any }>()
);

export const resetFormValue = createAction(FormActionTypes.ResetFormValue);
