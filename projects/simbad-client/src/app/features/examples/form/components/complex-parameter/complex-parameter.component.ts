import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit
} from '@angular/core';
import { ParameterTreeNode } from '../../../../../core/configuration-management/models/parameter-tree-node';
import { ObjectsDefinitionsService } from '../../../../../core/configuration-management/objects-definitions.service';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../../forms-service';

@Component({
    selector: 'simbad-complex-parameter',
    templateUrl: './complex-parameter.component.html',
    styleUrls: ['./complex-parameter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplexParameterComponent implements OnInit {
    @Input()
    node: ParameterTreeNode;
    @Input()
    level: number;
    @Input()
    form: FormGroup;
    @Input()
    parentPath: string;

    chosenOption: any;
    chosenEnumParameter: ParameterTreeNode;

    constructor(
        private ods: ObjectsDefinitionsService,
        private fs: FormsService
    ) {}

    ngOnInit() {
        if (this.node.definition.possibleClasses) {
            this.chosenOption = this.node.definition.possibleClasses[0];
            this.chosenEnumParameter = this.ods.toParameterTreeNode(
                this.ods.getByClassName(this.chosenOption),
                this.node.path
            );
        }
    }

    onSelect($event: any) {
        const oldParameter = this.chosenEnumParameter;
        this.fs.buildFormForNode(
            this.form,
            this.ods.toParameterTreeNode(
                this.ods.getByClassName($event.value),
                this.node.path
            )
        );
        this.chosenEnumParameter = this.ods.toParameterTreeNode(
            this.ods.getByClassName($event.value),
            this.node.path
        );
        this.fs.removeControls(this.form, oldParameter);
    }
}
