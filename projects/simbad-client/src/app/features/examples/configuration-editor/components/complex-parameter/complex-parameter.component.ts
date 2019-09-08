import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ParameterTreeNode } from '../../../../../core/configuration-management/models/parameter-tree-node';
import { ObjectsDefinitionsService } from '../../../../../core/configuration-management/objects-definitions.service';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../../services/forms.service';

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

    constructor(private ods: ObjectsDefinitionsService, private fs: FormsService) {}

    ngOnInit() {
        if (this.node.definition.possibleClasses) {
            this.chosenOption = this.node.definition.defaultValue;
            this.chosenEnumParameter = this.ods.toParameterTreeNode(
                this.ods.getByClassName(this.chosenOption),
                this.node.path
            );
        }
    }

    getDisplayName(className: string) {
        return className.startsWith('d_') ? className.slice(2) : className;
    }

    onSelect($event: any) {
        const oldParameter = this.chosenEnumParameter;
        this.fs.addNodeControlsToFormRecursive(
            this.form,
            this.ods.toParameterTreeNode(this.ods.getByClassName($event.value), this.node.path)
        );
        this.chosenEnumParameter = this.ods.toParameterTreeNode(this.ods.getByClassName($event.value), this.node.path);
        this.fs.removeNodeControlsFromForm(this.form, oldParameter);
    }
}
