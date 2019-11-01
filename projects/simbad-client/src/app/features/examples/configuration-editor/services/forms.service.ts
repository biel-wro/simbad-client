import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ParameterTreeNode } from '../../../../core/configuration-management/models';
import { ObjectsDefinitionsService } from '../../../../core/configuration-management/objects-definitions.service';
import { ValidatorsService } from './validators.service';
import { ObjectUtilsService } from '@simbad-client/app/features/examples/configuration-editor/services/object-utils.service';
import { cloneDeep } from 'lodash';

export type ConfigurationObject = {[key: string]: any};
export type FormValue = {[key: string]: any};

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

    /**
     * Adds all form controls necessary to edit configuration parameters of node and its child
     * nodes to formGroup. This method executes recursively for all node complexChildren, simpleChildren
     * and possibleClasses. The name of each added control is the same as node path in tree.
     * @param form FormGroup to add controls to
     * @param node Provides control names to add to form
     * @returns FormGroup with added controls
     */
    public addNodeControlsToFormRecursive(form: FormGroup, node: ParameterTreeNode) {
        this.addNodeParameterControlToForm(form, node);

        if (node.definition.possibleClasses) {
            this.addNodeControlsToFormRecursive(
                form,
                this.ods.toParameterTreeNode(this.ods.getByClassName(node.definition.defaultValue as string), node.path)
            );
        }
        node.complexChildren.forEach((child: ParameterTreeNode) => {
            this.addNodeControlsToFormRecursive(form, child);
        });
        node.simpleChildren.forEach((child: ParameterTreeNode) => {
            this.addNodeControlsToFormRecursive(form, child);
        });
    }

    /**
     * Removes all form controls that correspond to node and it's children paths from form
     * @param form Form to remove controls from
     * @param node Provides control names to remove
     *
     */
    public removeNodeControlsFromForm(form: FormGroup, node: ParameterTreeNode): FormGroup {
        Object.keys(form.controls)
            .filter((controlName) => controlName.startsWith(node.path))
            .forEach((controlNameToRemove) => form.removeControl(controlNameToRemove));
        return form;
    }

    /**
     * Converts simulation configuration object to it's form value, that then can be used to patch FormGroup
     * @param configuration
     * @return configuration converted to form value
     */
    public configurationToFormValue(configuration: ConfigurationObject): FormValue {
        const tree = this.configurationObjectToTreeValue(configuration);
        return this.treeValueToFormValue(tree);
    }

    /**
     * Converts raw form value to configuration object
     * @param value
     */
    public formValueToConfiguration(value: FormValue): ConfigurationObject {
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

    private addNodeParameterControlToForm(form: FormGroup, node: ParameterTreeNode) {
        if (node.definition.type === 'complex') return;
        const value = node.value || node.definition.defaultValue;
        form.addControl(
            node.definition.possibleClasses ? node.path + '/class' : node.path,
            new FormControl(value, this.vs.generateValidators(node.definition))
        );
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
