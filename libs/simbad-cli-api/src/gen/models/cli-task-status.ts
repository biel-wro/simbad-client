/* tslint:disable */
import { CliInfo } from './cli-info';
import { CliResult } from './cli-result';
export interface CliTaskStatus  {
  cliInfo: CliInfo;
  result?: CliResult;

  /**
   * Time when task was commisioned in unix timestamp format
   */
  startTimestamp: number;

  /**
   * The state of task
   */
  state: 'PROGRESS' | 'SUCCESS' | 'FAILURE' | 'PENDING';

  /**
   * Additional information about task, including failure reasons
   */
  status: string;
}
