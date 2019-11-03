import { Component, Input } from '@angular/core';
import { ListElement } from '../info-list/info-list.component';

@Component({
    selector: 'simbad-client-artifact-list',
    templateUrl: './artifact-list.component.html',
    styleUrls: ['./artifact-list.component.scss']
})
export class ArtifactListComponent {
    @Input() artifacts: ListElement[];
}
