/* tslint:disable */
export interface ArtifactInfo  {

  /**
   * UTC timestamp when artifact was created
   */
  createdUtc: string;

  /**
   * The id of artifact
   */
  id: number;

  /**
   * The path to artifact in filesystem
   */
  path: string;

  /**
   * The id of simulation in which the artifact was created
   */
  simulationId: number;

  /**
   * The size of artifact in kb
   */
  sizeKb: number;

  /**
   * The id of step in which the artifact was created
   */
  stepId: number;
}
