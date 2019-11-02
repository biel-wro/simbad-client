/* tslint:disable */
export interface CliRuntimeInfo  {

  /**
   * Cli cpu usage in percent
   */
  cpu: number;

  /**
   * Cli memory usage in megabytes
   */
  memory: number;

  /**
   * Cli command progress
   */
  progress: number;
}
