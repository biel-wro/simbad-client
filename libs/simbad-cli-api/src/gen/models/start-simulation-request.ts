/* tslint:disable */
export interface StartSimulationRequest  {

  /**
   * The configuration file to be sent to CLI
   */
  configuration: Blob;

  /**
   * The configuration file name
   */
  configurationName?: string;
}
