import { createAction, props } from '@ngrx/store';
import { SimulationSimpleInfo } from '@simbad-cli-api/gen/models/simulation-simple-info';

export enum SimulationResultsActionTypes {
    SimulationResultsLoaded = '[SimulationResults] Simulation results loaded',
    LoadSimulationResultsRequest = '[SimulationResults] Load SimulationResults'
}

export const simulationResultsLoaded = createAction(
    SimulationResultsActionTypes.SimulationResultsLoaded,
    props<{ results: SimulationSimpleInfo[] }>()
);

export const loadSimulationResultsRequest = createAction(
    SimulationResultsActionTypes.LoadSimulationResultsRequest,
    props<{ id?: number; num?: number }>()
);
