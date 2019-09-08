import { Component, OnInit } from '@angular/core';
import { Artifact } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/artifact/artifact.component';
import { ListElement } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/info-list/info-list.component';

@Component({
    selector: 'simbad-client-artifact-list',
    templateUrl: './artifact-list.component.html',
    styleUrls: ['./artifact-list.component.scss']
})
export class ArtifactListComponent implements OnInit {
    artifacts: Artifact[] = [
        {
            name: 'cli_out.csv',
            createdTimestamp: Date.now(),
            size: 12831283,
            compressedSize: 123413,
            path: '/home/user/dev/simbad/output/SIM_0_CONF_parametric_evolution_3d/cli_out.csv',
        },
        {
            name: 'some_other_artifact.parquet',
            createdTimestamp: Date.now(),
            size: 12831283,
            compressedSize: 123413,
            path: '/home/user/dev/simbad/output/SIM_0_CONF_parametric_evolution_3d/analyzer.parquet',
        }
    ];


    constructor() {
    }

    ngOnInit() {
    }

    toElementList(artifact: Artifact): ListElement[] {
        return [
            { key: 'Name', value: artifact.name },
            { key: 'Created Timestamp', value: new Date(artifact.createdTimestamp).toISOString() },
            { key: 'Size (MB)', value: (artifact.size / 1000).toString(10) },
            { key: 'Path', value: artifact.path },
        ];
    }

}
