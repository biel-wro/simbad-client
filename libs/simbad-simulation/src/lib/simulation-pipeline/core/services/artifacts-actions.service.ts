import { Injectable } from '@angular/core';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';
import { ListElement } from '@simbad-simulation/lib/simulation-pipeline/components/common/info-list/info-list.component';
import { formatBytes } from '@simbad-simulation/lib/simulation-pipeline/core/functions/size-format-utils';
import {
    downloadArtifact,
    openArtifact,
    previewArtifact
} from '@simbad-simulation/lib/simulation-pipeline/core/store/artifacts/artifacts.actions';
import { ArtifactActionType } from '@simbad-simulation/lib/simulation-pipeline/core/models';
import { extractFilename } from '@simbad-simulation/lib/simulation-pipeline/core/functions/path-utils';
import { Store } from '@ngrx/store';
@Injectable({
    providedIn: 'root'
})
export class ArtifactsActionsService {

    constructor(
        private readonly store: Store<{}>,
    ) {
    }

    public artifactsToElementList(artifacts: ArtifactInfo[], actions: ArtifactActionType[]): ListElement[] {
        return artifacts.map((artifact) => this.artifactToListElement(artifact, actions));
    }

    private artifactToListElement(artifact: ArtifactInfo, actions: ArtifactActionType[]): ListElement {
        const { id, name } = artifact;

        const element: ListElement = {
            key: name,
            value: `Size ${formatBytes(artifact.sizeKb)}`,
        };

        const callbacks = {
            download: () => this.store.dispatch(downloadArtifact({ id, name })),
            preview: () => this.store.dispatch(previewArtifact({ id, name })),
        };

        actions.forEach((action) => {
            element[action] = callbacks[action];
        });

        return element;
    }
}

