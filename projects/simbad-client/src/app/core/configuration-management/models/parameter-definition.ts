export interface ParameterDefinition {
    className: string;
    description: string;
    type: 'simple' | 'complex' | 'enum' | 'string';
    isRoot: boolean;
    valueType?: 'int' | 'float';
    minValue?: number;
    maxValue?: number;
    defaultValue?: number | string;
    possibleClasses?: string[];
    childClasses?: string[];
}
