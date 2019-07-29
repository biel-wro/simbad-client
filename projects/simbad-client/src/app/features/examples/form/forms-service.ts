import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ParameterDefinition } from '../../../core/configuration-management/models';
import { ParameterTreeNode } from '../../../core/configuration-management/models/parameter-tree-node';
import { ObjectsDefinitionsService } from '../../../core/configuration-management/objects-definitions.service';

@Injectable({
    providedIn: 'root'
})
export class FormsService {
    constructor(private fb: FormBuilder, private ods: ObjectsDefinitionsService) {}

    private static generateIntValidators(parameter: ParameterDefinition): ValidatorFn[] {
        return [Validators.min(parameter.maxValue), Validators.max(parameter.maxValue)];
    }

    private static generateFloatValidators(parameter: ParameterDefinition): ValidatorFn[] {
        return [Validators.min(parameter.maxValue), Validators.max(parameter.maxValue)];
    }

    public generateValidators(parameter: ParameterDefinition): ValidatorFn[] {
        let validators = [Validators.required];
        switch (parameter.valueType) {
            case 'int':
                validators = validators.concat(FormsService.generateIntValidators(parameter));
                break;
            case 'float':
                validators = validators.concat(FormsService.generateFloatValidators(parameter));
                break;
        }
        return validators;
    }

    public addParameterControlToForm(form: FormGroup, node: ParameterTreeNode): FormGroup {
        if (node.definition.type === 'complex') return form;
        form.addControl(node.definition.possibleClasses ? node.path + '.class' : node.path, new FormControl());
        return form;
    }

    public getPathForParameter(node: ParameterTreeNode): string {
        if (node.definition.type === 'simple') {
        }
        if (node.definition.type === 'enum') {
            return node.path + '.class';
        }
        return '';
    }

    public removeControlFromForm(form: FormGroup, node: ParameterTreeNode): FormGroup {
        if (node.definition.type === 'complex') return form;
        form.removeControl(node.definition.possibleClasses ? node.path + '.class' : node.path);
        return form;
    }

    public removeControls(form: FormGroup, node: ParameterTreeNode): FormGroup {
        form = this.removeControlFromForm(form, node);
        node.complexChildren.forEach((child: ParameterTreeNode) => {
            form = this.removeControls(form, child);
        });
        node.simpleChildren.forEach((child: ParameterTreeNode) => {
            form = this.removeControls(form, child);
        });
        return form;
    }

    public buildFormForNode(form: FormGroup, node: ParameterTreeNode): FormGroup {
        form = this.addParameterControlToForm(form, node);

        if (node.definition.possibleClasses) {
            form = this.buildFormForNode(
                form,
                this.ods.toParameterTreeNode(this.ods.getByClassName(node.definition.possibleClasses[0]), node.path)
            );
        }
        node.complexChildren.forEach((child: ParameterTreeNode) => {
            form = this.buildFormForNode(form, child);
        });
        node.simpleChildren.forEach((child: ParameterTreeNode) => {
            form = this.buildFormForNode(form, child);
        });
        return form;
    }

    public formValueToTree(value: any): any {
        const tree = {};
        Object.keys(value).forEach(key => this.deepAssign(tree, key, value[key]));
        return tree;
    }

    public deepAssign(obj: any, prop: string | string[], value: any): void {
        if (typeof prop === 'string') prop = prop.split('.');
        if (prop.length > 1) {
            const e = prop.shift();
            this.deepAssign(
                (obj[e] = Object.prototype.toString.call(obj[e]) === '[object Object]' ? obj[e] : {}),
                prop,
                value
            );
        } else {
            obj[prop[0]] = value;
        }
    }

    public treeValueToConfigurationObject(treeObject) {
        decorateConfiguration(treeObject);
        return treeObject;

        function decorateConfiguration(obj) {
            for (const property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (typeof obj[property] === 'object') {
                        decorateConfiguration(obj[property]);
                    } else {
                        obj['parameters'] = obj[obj[property]];
                        delete obj[obj[property]];
                    }
                }
            }
        }
    }
}
