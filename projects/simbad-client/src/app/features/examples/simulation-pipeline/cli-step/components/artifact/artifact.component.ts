import { Component, Input, OnInit } from '@angular/core';
import { ListElement } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/info-list/info-list.component';

export interface Artifact {
    name: string;
    createdTimestamp: number;
    path: string;
    size: number;
    compressedSize?: number;
}

@Component({
    selector: 'simbad-client-artifact',
    templateUrl: './artifact.component.html',
    styleUrls: ['./artifact.component.scss']
})
export class ArtifactComponent implements OnInit {
    @Input()
    elements: ListElement[];

    isExpanded = false;

    constructor() {
    }

    ngOnInit() {
    }

}
