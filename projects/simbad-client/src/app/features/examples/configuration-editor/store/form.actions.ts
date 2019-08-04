import { createAction, props } from '@ngrx/store';

export enum FormActionTypes {
    UpdateFormValue = '[Form] Update',
    ResetFormValue = '[Form] Reset',
    UpdateRootObjects = '[Form] Update root objects'
}

export const actionFormUpdate = createAction(FormActionTypes.UpdateFormValue, props<{ formValue: any }>());

export const actionFormUpdateRootObjects = createAction(
    FormActionTypes.UpdateRootObjects,
    props<{ rootObjectClassNames: string[] }>()
);

export const actionFormReset = createAction(FormActionTypes.ResetFormValue);
