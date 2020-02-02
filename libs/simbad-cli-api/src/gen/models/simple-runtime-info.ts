/* tslint:disable */
export interface SimpleRuntimeInfo  {

  /**
   * Simulation step progress
   */
  progress: number;

  /**
   * The status of simulation step
   */
  status: 'ONGOING' | 'SUCCESS' | 'FAILURE';
}
