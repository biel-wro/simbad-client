/* tslint:disable */
export interface AnalyzerRuntimeInfo  {

  /**
   * Error message
   */
  error?: string;

  /**
   * The progress of job
   */
  progress: number;

  /**
   * Id of spark job
   */
  sparkJobId?: number;
}
