/* tslint:disable */
export interface SimulationStatus  {

  /**
   * Current step of simulation pipeline
   */
  currentStep?: 'CONF' | 'CLI' | 'ANALYZER' | 'REPORT' | 'FINISHED';

  /**
   * The id of simulation
   */
  simulationId?: number;

  /**
   * Simulation status - BUSY / IDLE
   */
  status: 'BUSY' | 'IDLE';
}
