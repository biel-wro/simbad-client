import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ParameterTreeNode } from '../../../../../core/configuration-management/models';
import { FormControl, FormGroup } from '@angular/forms';

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

    control: FormControl;

    constructor() {}

    ngOnInit() {
        this.node.path = this.parentPath + `/${this.node.definition.className}`;
        this.control = this.form.get(this.node.path) as FormControl;
    }

    // hasValueErrors(): boolean {
    // }
    //
    // getErrorMessage(): string {
    //
    // }
}
