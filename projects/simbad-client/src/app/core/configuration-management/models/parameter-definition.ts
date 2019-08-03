export interface ParameterDefinition {
    className: string;
    description: string;
    type: 'simple' | 'complex' | 'enum';
    isRoot: boolean;
    valueType?: 'int' | 'float' | 'string';
    minValue?: number;
    maxValue?: number;
    defaultValue?: number | string;
    possibleClasses?: string[];
    childClasses?: string[];
}
