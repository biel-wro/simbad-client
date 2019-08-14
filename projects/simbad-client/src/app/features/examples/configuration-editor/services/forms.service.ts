import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ParameterTreeNode } from '../../../../core/configuration-management/models';
import { ObjectsDefinitionsService } from '../../../../core/configuration-management/objects-definitions.service';
import { ValidatorsService } from './validators.service';
import { ObjectUtilsService } from '@simbad-client/app/features/examples/configuration-editor/services/object-utils.service';
import { cloneDeep } from 'lodash';
@Injectable({
    providedIn: 'root'
})
export class FormsService {
    constructor(
        private fb: FormBuilder,
        private ods: ObjectsDefinitionsService,
        private vs: ValidatorsService,
        private objectUtils: ObjectUtilsService
    ) {
    }

    public buildFormForNode(form: FormGroup, node: ParameterTreeNode): FormGroup {
        form = this.addNodeParameterControlToForm(form, node);

        if (node.definition.possibleClasses) {
            form = this.buildFormForNode(
                form,
                this.ods.toParameterTreeNode(this.ods.getByClassName(node.definition.defaultValue as string), node.path)
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

    public removeNodeControlsFromForm(form: FormGroup, node: ParameterTreeNode): FormGroup {
        form = this.removeParameterControlFromForm(form, node);
        node.complexChildren.forEach((child: ParameterTreeNode) => {
            form = this.removeNodeControlsFromForm(form, child);
        });
        node.simpleChildren.forEach((child: ParameterTreeNode) => {
            form = this.removeNodeControlsFromForm(form, child);
        });
        return form;
    }

    private removeParameterControlFromForm(form: FormGroup, node: ParameterTreeNode): FormGroup {
        if (node.definition.type === 'complex') return form;
        form.removeControl(node.definition.possibleClasses ? node.path + '/class' : node.path);
        return form;
    }

    public configurationToFormValue(configurationObject) {
        const tree = this.configurationObjectToTreeValue(configurationObject);
        return this.treeValueToFormValue(tree);
    }

    public formValueToConfiguration(value) {
        const tree = this.formValueToTreeValue(value);
        return this.treeFormValueToConfiguration(tree);
    }

    private treeValueToFormValue(tree: any): any {
        const formValue = {};
        findPath(tree, '');

        function findPath(obj, path): any {
            for (const property in obj) {
                if (obj.hasOwnProperty(property)) {
                    const nextPath = path === '' ? property : path + '/' + property;
                    if (typeof obj[property] === 'object') {
                        findPath(obj[property], nextPath);
                    } else {
                        formValue[nextPath] = obj[property];
                    }
                }
            }
        }

        return formValue;
    }

    private addNodeParameterControlToForm(form: FormGroup, node: ParameterTreeNode): FormGroup {
        if (node.definition.type === 'complex') return form;
        form.addControl(
            node.definition.possibleClasses ? node.path + '/class' : node.path,
            new FormControl(node.definition.defaultValue, this.vs.generateValidators(node.definition))
        );
        return form;
    }

    private formValueToTreeValue(value: any): any {
        const tree = {};
        Object.keys(value)
            .filter(key => value[key] !== null)
            .forEach(key => this.objectUtils.deepAssign(tree, key, value[key]));
        return tree;
    }

    private configurationObjectToTreeValue(configurationObject: any): any {
        const newConfiguration = cloneDeep(configurationObject);
        decorateConfiguration(newConfiguration);
        return newConfiguration;

        function decorateConfiguration(obj) {
            for (const property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (property === 'default_attributes') {
                        decorateDefaultAttributes(obj[property]);
                        continue;
                    }
                    if (property === 'parameters') {
                        const prop = obj['class'];
                        obj[prop] = obj['parameters'];
                        delete obj['parameters'];
                        decorateConfiguration(obj[prop]);
                    }
                    if (typeof obj[property] === 'object') {
                        decorateConfiguration(obj[property]);
                    }
                }
            }
        }

        function decorateDefaultAttributes(obj: any) {
            for (const property in obj) {
                if (obj.hasOwnProperty(property)) {
                    const newProp = 'd_' + property;
                    obj[newProp] = obj[property];
                    delete obj[property];
                    if (typeof obj[newProp] === 'object') {
                        decorateDefaultAttributes(obj[newProp]);
                    }
                }
            }
        }
    }

    private treeFormValueToConfiguration(treeObject) {
        const tree = cloneDeep(treeObject);
        decorateConfiguration(tree);
        return tree;

        function decorateConfiguration(obj) {
            for (const property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (property === 'class') {
                        obj['parameters'] = obj[obj[property]];
                        const allowed = ['parameters', 'class', 'default_attributes'];
                        Object.keys(obj)
                            .filter(key => !allowed.includes(key))
                            .forEach(key => delete obj[key]);
                        decorateConfiguration(obj['parameters']);
                    }
                    if (property.startsWith('d_')) {
                        const newProp = property.slice(2);
                        obj[newProp] = obj[property];
                        delete obj[property];
                        decorateConfiguration(obj[newProp]);
                    }
                    if (typeof obj[property] === 'object') {
                        decorateConfiguration(obj[property]);
                    }
                }
            }
        }
    }
 }
