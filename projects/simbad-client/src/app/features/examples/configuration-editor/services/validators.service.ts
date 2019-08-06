import { Injectable } from '@angular/core';
import { ParameterDefinition } from '../../../../core/configuration-management/models';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidatorsService {
    constructor() {}

    /**
     * Generates formValue validators for parameter
     * @param parameter
     * @returns array with validator functions
     */
    public generateValidators(parameter: ParameterDefinition): ValidatorFn[] {
        if (this.isParameterValueNumber(parameter)) {
            return [Validators.required, Validators.min(parameter.minValue), Validators.max(parameter.maxValue)];
        }
        return [];
    }

    private isParameterValueNumber(parameter: ParameterDefinition): boolean {
        return parameter.valueType === 'int' || parameter.valueType === 'float';
    }
}
