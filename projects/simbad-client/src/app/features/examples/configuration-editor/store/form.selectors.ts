import { createSelector } from '@ngrx/store';

import { ExamplesState, selectExamples } from '../../examples.state';

export const selectRootObjectClassNames = createSelector(
    selectExamples,
    (state: ExamplesState) => state.form.rootObjectClassNames
);

export const selectFormValues = createSelector(
    selectExamples,
    (state: ExamplesState) => state.form.formValue
);
