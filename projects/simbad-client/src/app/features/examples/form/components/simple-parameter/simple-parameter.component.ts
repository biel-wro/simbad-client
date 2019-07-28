import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit
} from '@angular/core';
import { ParameterTreeNode } from '../../../../../core/configuration-management/models/parameter-tree-node';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'simbad-simple-parameter',
    templateUrl: './simple-parameter.component.html',
    styleUrls: ['./simple-parameter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleParameterComponent implements OnInit {
    @Input()
    node: ParameterTreeNode;
    @Input()
    form: FormGroup;
    @Input()
    parentPath: string;

    constructor() {}

    ngOnInit() {
        this.node.path = this.parentPath + `.${this.node.definition.className}`;
    }
}
