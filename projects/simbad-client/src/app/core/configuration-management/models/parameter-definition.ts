export interface ParameterDefinition {
    className: string;
    description: string;
    type: 'simple' | 'complex' | 'enum' | 'string';
    isRoot: boolean;
    valueType?: 'int' | 'float';
    minValue?: number;
    maxValue?: number;
    possibleClasses?: string[];
    childClasses?: string[];
}
