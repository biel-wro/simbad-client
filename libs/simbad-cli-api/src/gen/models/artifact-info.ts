/* tslint:disable */
export interface ArtifactInfo  {

  /**
   * UTC timestamp when artifact was created
   */
  createdUtc: string;

  /**
   * The file type of artifact
   */
  fileType: 'CSV' | 'JSON' | 'PDF' | 'PNG' | 'LAS' | 'ENTWINE' | 'ZIP' | 'LOG';

  /**
   * The id of artifact
   */
  id: number;

  /**
   * The name of artifact
   */
  name: string;

  /**
   * The path to artifact
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
