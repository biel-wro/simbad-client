import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ListElement } from '@simbad-client/app/features/examples/simulation-pipeline/steps/cli-step/components/info-list/info-list.component';

@Component({
    selector: 'simbad-client-task-context',
    templateUrl: './task-context.component.html',
    styleUrls: ['./task-context.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskContextComponent {
    @Input() data: ListElement[];
}
