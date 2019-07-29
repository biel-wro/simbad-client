import { Injectable } from '@angular/core';
import { ConfigurationSchemaProviderService } from './configuration-schema-provider.service';
import { ParameterDefinition, ParameterTreeNode } from './models';

@Injectable({
    providedIn: 'root'
})
export class ObjectsDefinitionsService {
    private configurationSchema: any;

    constructor(private schemaProvider: ConfigurationSchemaProviderService) {
        this.configurationSchema = schemaProvider.getSchema();
    }

    public getByClassName(className: string): ParameterDefinition | undefined {
        const val = this.configurationSchema.classMap[className];
        if (!val) return undefined;
        if (val.type === 'simple') {
            return {
                className,
                type: val.type,
                description: val.description,
                valueType: val.valueType,
                minValue: val.minValue,
                maxValue: val.maxValue,
                isRoot: val.isRoot ? val.isRoot : false
            };
        } else if (val.type === 'complex') {
            return {
                className,
                type: val.type,
                description: val.description,
                childClasses: val.childClasses,
                isRoot: val.isRoot ? val.isRoot : false
            };
        } else if (val.type === 'enum') {
            return {
                className,
                type: val.type,
                description: val.description,
                possibleClasses: val.possibleClasses,
                isRoot: val.isRoot ? val.isRoot : false
            };
        }
    }

    public getAllChildren(className: string): ParameterDefinition[] {
        const parameter = this.getByClassName(className);
        const children = [];
        if (parameter.childClasses) {
            parameter.childClasses.forEach((name: string) => {
                children.push(this.getByClassName(name));
            });
        }
        return children;
    }

    public toParameterTreeNode(parameter: ParameterDefinition, parentPath?: string): ParameterTreeNode {
        if (!parameter) return;
        const children: ParameterDefinition[] = this.getAllChildren(parameter.className);
        const simpleChildren: ParameterDefinition[] = children.filter(child => child.type === 'simple');
        const complexChildren: ParameterDefinition[] = children.filter(child => child.type !== 'simple');
        const path = this.getPath(parameter.className, parentPath);
        return {
            path: path,
            definition: parameter,
            simpleChildren: simpleChildren.length
                ? simpleChildren.map(child => this.toParameterTreeNode(child, path))
                : [],
            complexChildren: complexChildren.length
                ? complexChildren.map(child => this.toParameterTreeNode(child, path))
                : []
        };
    }

    public isSchemaValid(): boolean {
        return this.areAllNecessaryParametersDefined();
    }

    private getPath(className: string, parentPath?: string) {
        return parentPath ? `${parentPath}.${className}` : `${className}`;
    }

    private areAllNecessaryParametersDefined(): boolean {
        const objectClasses = Object.keys(this.configurationSchema.classMap);
        let isValid = true;
        objectClasses.forEach((objName: string) => {
            const object = this.getByClassName(objName);
            if (object.childClasses && object.childClasses.length) {
                object.childClasses.forEach(childName => {
                    if (!objectClasses.includes(childName)) {
                        console.log(childName);
                        isValid = false;
                    }
                });
            }
        });
        return isValid;
    }
}
