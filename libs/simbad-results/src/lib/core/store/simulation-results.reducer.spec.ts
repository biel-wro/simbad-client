import { initialState, simulationResultsReducer } from './simulation-results.reducer';

describe('SimulationResults Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as any;

            const result = simulationResultsReducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
