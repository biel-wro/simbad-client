import { createAction, props } from '@ngrx/store';
import { StartSimulationRequest } from '@simbad-cli-api/gen/models/start-simulation-request';
import { SimulationInfo, SimulationStepInfo } from '@simbad-cli-api/gen/models';


export enum SimulationPipelineActions {
    CheckSimulationStatus = '[SimulationPipeline] Check simulation status',
    PollForSimulationStatusChange = '[SimulationPipeline] Poll for simulation status change',
    GetSimulationInfo = '[SimulationPipeline] Get simulation info',
    UpdateSimulationInfo = '[SimulationPipeline] UpdateSimulationInfo',
    GetArtifactInfo = '[SimulationPipeline] Get artifact info',
    GetSimulationStepInfo = '[SimulationPipeline] Get simulation step info',
    PollForSimulationStepInfoChange = '[SimulationPipeline] Poll for step info change',
    UpdateStepInfo = '[SimulationPipeline] Update step info',
    UpdateCliStepInfo = '[SimulationPipeline] Update cli step info',
    UpdateAnalyzerStepInfo = '[SimulationPipeline] Update analyzer step info',
    CliStepFinished = '[SimulationPipeline] Cli step finished',
    AnalyzerStepFinished = '[SimulationPipeline] Analyzer step finished',
    ReportStepFinished = '[SimulationPipeline] Report step finished',
    StartSimulation = '[SimulationPipeline] Start simulation',
    SimulationError = '[SimulationPipeline] Simulation http error',
    UpdateElapsedTime = '[SimulationPipeline] Update elapsed time',
    StartTimer = '[SimulationPipeline] Start timer',
    StopTimer = '[SimulationPipeline] Stop timer',
    OpenArtifact = '[SimulationPipeline] Open artifact',
    DownloadArtifact = '[SimulationPipeline] Download artifact'
}


export const checkForRunningSimulation = createAction(SimulationPipelineActions.CheckSimulationStatus);
export const pollForSimulationStatusChange = createAction(
    SimulationPipelineActions.PollForSimulationStatusChange,
    props<{simulationId: number}>()
);

export const startSimulation = createAction(
    SimulationPipelineActions.StartSimulation,
    props<{request: StartSimulationRequest}>()
);

export const getSimulationInfo = createAction(
    SimulationPipelineActions.GetSimulationInfo,
    props<{simulationId: number}>()
);

export const updateSimulationInfo  = createAction(
    SimulationPipelineActions.UpdateSimulationInfo,
    props<{simulation: SimulationInfo}>()
);

export const getArtifactInfo = createAction(
    SimulationPipelineActions.GetArtifactInfo,
    props<{artifactId: number}>()
);

export const getSimulationStepInfo = createAction(
    SimulationPipelineActions.GetSimulationStepInfo,
    props<{stepId: number}>()
);

export const pollForSimulationStepInfo = createAction(
    SimulationPipelineActions.PollForSimulationStepInfoChange,
    props<{stepId: number}>()
);

export const simulationError = createAction(
    SimulationPipelineActions.SimulationError,
    props<{ error?: any }>()
);

export const updateStepInfo = createAction(
    SimulationPipelineActions.UpdateStepInfo,
    props<{step: SimulationStepInfo}>()
);

export const updateCliStepInfo = createAction(
    SimulationPipelineActions.UpdateCliStepInfo,
    props<{step: SimulationStepInfo}>()
);

export const updateAnalyzerInfo = createAction(
    SimulationPipelineActions.UpdateAnalyzerStepInfo,
    props<{step: SimulationStepInfo}>()
);

export const cliStepFinished = createAction(
    SimulationPipelineActions.CliStepFinished,
    props<{step: SimulationStepInfo}>()
);

export const analyzerStepFinished = createAction(
    SimulationPipelineActions.AnalyzerStepFinished,
    props<{step: SimulationStepInfo}>()
);

export const reportStepFinished = createAction(
    SimulationPipelineActions.ReportStepFinished,
    props<{step: SimulationStepInfo}>()
);


export const updateElapsedTime = createAction(
    SimulationPipelineActions.UpdateElapsedTime,
    props<{ time: number }>()
);

export const startTimer = createAction(
    SimulationPipelineActions.StartTimer
);

export const stopTimer = createAction(
    SimulationPipelineActions.StopTimer
);

export const openArtifact = createAction(
    SimulationPipelineActions.OpenArtifact,
    props<{ path: string }>()
);

export const downloadArtifact = createAction(
    SimulationPipelineActions.DownloadArtifact,
    props<{ id: number, name: string }>()
);

