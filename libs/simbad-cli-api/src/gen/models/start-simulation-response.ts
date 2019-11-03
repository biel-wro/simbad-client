/* tslint:disable */
import { SimulationStepInfo } from './simulation-step-info';
export interface StartSimulationResponse  {

  /**
   * The id of started simulation
   */
  simulationId?: number;

  /**
   * The first step of started simuation
   */
  simulationStep?: SimulationStepInfo;
}
