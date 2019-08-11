/* tslint:disable */
export interface RunCliCommandRequest  {

  /**
   * The configuration file to be sent to CLI
   */
  configuration: Blob;

  /**
   * The configuration file name
   */
  configurationName?: string;
}
