import { ParameterDefinition } from './parameter-definition';

export interface ParameterTreeNode {
    path?: string;
    definition: ParameterDefinition;
    simpleChildren: ParameterTreeNode[];
    complexChildren: ParameterTreeNode[];
    possibleValues?: ParameterTreeNode[];
    value?: string;
}
