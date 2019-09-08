/* tslint:disable */
export interface CliResult  {

  /**
   * Path to generated csv file
   */
  artifactPath: string;

  /**
   * The size of generated artifact in megabytes
   */
  artifactSize: number;

  /**
   * The total time of execution for task
   */
  executionTime: number;
}
