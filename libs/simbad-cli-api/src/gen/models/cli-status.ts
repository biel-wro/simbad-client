/* tslint:disable */
export interface CliStatus  {

  /**
   * CLI status - BUSY / IDLE
   */
  status: 'BUSY' | 'IDLE';

  /**
   * The ID of CLI task that is being executed
   */
  taskId?: string;
}
