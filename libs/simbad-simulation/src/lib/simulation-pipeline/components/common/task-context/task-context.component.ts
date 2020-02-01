import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ListElement } from '../info-list/info-list.component';

@Component({
    selector: 'simbad-client-task-context',
    templateUrl: './task-context.component.html',
    styleUrls: ['./task-context.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskContextComponent {
    @Input() data: ListElement[];
}
