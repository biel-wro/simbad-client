import { ParameterTreeNode } from '../models';

export const parameterTreeNodeMock: ParameterTreeNode = {
    definition: {
        className: 'model',
        description: 'Model description',
        possibleClasses: ['parameter_evolution_3d'],
        defaultValue: 'parameter_evolution_3d',
        isRoot: true,
        type: 'enum'
    },
    simpleChildren: [],
    complexChildren: []
};
