import { createSelector } from '@ngrx/store';

import { SimulationState, selectSimulationState } from '../../simulationState';

export const selectRootObjectClassNames = createSelector(
    selectSimulationState,
    (state: SimulationState) => state.form.rootObjectClassNames
);

export const selectFormValues = createSelector(
    selectSimulationState,
    (state: SimulationState) => state.form.formValue
);

export const selectConfiguration = createSelector(
    selectSimulationState,
    (state: SimulationState) => {
        return {
            name: state.form.configurationName,
            formValue: state.form.formValue
        };
    }
);

export const selectNodeValue = (path: string) =>
    createSelector(
        selectFormValues,
        (values: any) => values[path]
    );

export const selectConfigurationName = createSelector(
    selectSimulationState,
    (state: SimulationState) => state.form.configurationName
);
