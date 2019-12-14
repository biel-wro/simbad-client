import { createAction, props } from '@ngrx/store';

export enum ArtifactsActions {
    OpenArtifact = '[Artifacts] Open artifact',
    DownloadArtifact = '[Artifacts] Download artifact'
}

export const openArtifact = createAction(
    ArtifactsActions.OpenArtifact,
    props<{ path: string }>()
);

export const downloadArtifact = createAction(
    ArtifactsActions.DownloadArtifact,
    props<{ id: number, name: string }>()
);

