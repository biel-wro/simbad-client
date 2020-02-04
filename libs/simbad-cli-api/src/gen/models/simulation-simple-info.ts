/* tslint:disable */
import { ConfigurationInfo } from './configuration-info';
import { SimpleRuntimeInfo } from './simple-runtime-info';
export interface SimulationSimpleInfo  {
  analyzer?: SimpleRuntimeInfo;
  cli?: SimpleRuntimeInfo;
  configuration: ConfigurationInfo;

  /**
   * UTC timestamp when step was finished
   */
  finishedUtc?: string;

  /**
   * The id of simulation report
   */
  reportId?: number;
  reports?: SimpleRuntimeInfo;

  /**
   * The id of the simulation
   */
  simulationId: number;

  /**
   * UTC timestamp when step was started
   */
  startedUtc: string;

  /**
   * The status of simulation
   */
  status: 'ONGOING' | 'SUCCESS' | 'FAILURE';
}
