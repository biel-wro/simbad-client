/* tslint:disable */
export interface CliStatus  {

  /**
   * cpu usage
   */
  cpu?: number;

  /**
   * Memory usage
   */
  memory?: number;

  /**
   * CLI status - BUSY / IDLE
   */
  status?: string;

  /**
   * CLI uptime in s
   */
  uptime?: number;
}
