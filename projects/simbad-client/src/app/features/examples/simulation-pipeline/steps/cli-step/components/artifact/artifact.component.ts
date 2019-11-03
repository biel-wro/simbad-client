import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ListElement } from '../info-list/info-list.component';


@Component({
    selector: 'simbad-client-artifact',
    templateUrl: './artifact.component.html',
    styleUrls: ['./artifact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtifactComponent {
    @Input() elements: ListElement[];
}
