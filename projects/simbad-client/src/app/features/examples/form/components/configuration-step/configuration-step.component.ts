import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ParameterTreeNode } from '../../../../../core/configuration-management/models/parameter-tree-node';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../../forms-service';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';
import map = promise.map;

@Component({
    selector: 'simbad-configuration-step',
    templateUrl: './configuration-step.component.html',
    styleUrls: ['./configuration-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationStepComponent implements OnInit {
    @Input()
    node: ParameterTreeNode;
    @Input()
    form: FormGroup;

    constructor(private fs: FormsService) {}

    ngOnInit() {
        this.node.path = `${this.node.definition.className}`;
        this.form = this.fs.buildFormForNode(this.form, this.node);
    }
}
