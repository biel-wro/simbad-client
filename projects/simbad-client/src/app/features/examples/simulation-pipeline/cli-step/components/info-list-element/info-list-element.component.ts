import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ListElement } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/info-list/info-list.component';

@Component({
    selector: 'simbad-client-info-list-element',
    templateUrl: './info-list-element.component.html',
    styleUrls: ['./info-list-element.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoListElementComponent {
    @Input() data: ListElement;
}
