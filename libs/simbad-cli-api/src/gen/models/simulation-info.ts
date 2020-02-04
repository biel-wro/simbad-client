/* tslint:disable */
import { AnalyzerRuntimeInfo } from './analyzer-runtime-info';
import { ArtifactInfo } from './artifact-info';
import { CliRuntimeInfo } from './cli-runtime-info';
import { SimulationStepInfo } from './simulation-step-info';
export interface SimulationInfo  {
  analyzerRuntimeInfo?: AnalyzerRuntimeInfo;
  artifacts: Array<ArtifactInfo>;
  cliRuntimeInfo?: CliRuntimeInfo;

  /**
   * Id of currently excuted step
   */
  currentStepId: number;

  /**
   * UTC timestamp when simulation was finished
   */
  finishedUtc?: string;

  /**
   * The id of simulation
   */
  id: number;

  /**
   * UTC timestamp when simulation was started
   */
  startedUtc: string;

  /**
   * The status of simulation step
   */
  status: 'ONGOING' | 'SUCCESS' | 'FAILURE';
  steps: Array<SimulationStepInfo>;

  /**
   * The path to working directory for this simulation
   */
  workdir: string;
}
