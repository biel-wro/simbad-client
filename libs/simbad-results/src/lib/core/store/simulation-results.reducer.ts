import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SimulationSimpleInfo } from '@simbad-cli-api/gen/models/simulation-simple-info';
import * as SimulationActions from './simulation-results.actions';

export const simulationResultsFeatureKey = 'simulationResults';

export const adapter: EntityAdapter<SimulationSimpleInfo> = createEntityAdapter<SimulationSimpleInfo>({
    selectId: (info: SimulationSimpleInfo) => info.simulationId
});

export const initialState: EntityState<SimulationSimpleInfo> = adapter.getInitialState();

const reducer = createReducer(
    initialState,
    on(SimulationActions.simulationResultsLoaded, (state, { results }) => adapter.addAll(results, state))
);

export function simulationResultsReducer(state: EntityState<SimulationSimpleInfo>, action: Action) {
    return reducer(state, action);
}
