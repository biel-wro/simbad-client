import { adapter, simulationResultsFeatureKey } from './simulation-results.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { SimulationSimpleInfo } from '@simbad-cli-api/gen/models/simulation-simple-info';

const { selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const selectSimulationResultsState = createFeatureSelector<EntityState<SimulationSimpleInfo>>(
    simulationResultsFeatureKey
);

export const selectAllSimulationResults = createSelector(
    selectSimulationResultsState,
    selectAll
);
