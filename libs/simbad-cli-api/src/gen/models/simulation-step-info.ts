/* tslint:disable */
import { AnalyzerRuntimeInfo } from './analyzer-runtime-info';
import { ArtifactInfo } from './artifact-info';
import { CliRuntimeInfo } from './cli-runtime-info';
export interface SimulationStepInfo  {
  analyzerRuntimeInfo?: AnalyzerRuntimeInfo;
  artifacts?: Array<ArtifactInfo>;

  /**
   * The celery task id of given step
   */
  celeryId: string;
  cliRuntimeInfo?: CliRuntimeInfo;

  /**
   * UTC timestamp when step was finished
   */
  finishedUtc?: string;

  /**
   * The id of step
   */
  id: number;

  /**
   * Step origin
   */
  origin: 'CONF' | 'CLI' | 'ANALYZER' | 'REPORT';

  /**
   * The id of simulation in which the step was executed
   */
  simulationId: number;

  /**
   * UTC timestamp when step was started
   */
  startedUtc: string;
  status: 'ONGOING' | 'SUCCESS' | 'FAILURE';
}
