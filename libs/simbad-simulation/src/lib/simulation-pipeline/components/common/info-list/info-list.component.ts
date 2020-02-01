import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface ListElement {
    key: string;
    value: string;
    preview?: () => any;
    download?: () => any;
    show?: () => any;
    redirect?: () => any;
}

@Component({
    selector: 'simbad-client-info-list',
    templateUrl: './info-list.component.html',
    styleUrls: ['./info-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoListComponent {
    @Input() data: ListElement[];
}
