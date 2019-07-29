import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ParameterNameUtilsService {
    constructor() {}

    /**
     * Converts snake_case string to camelCase
     * @param {string} str snake_case string
     * @returns str converted to camelCase
     */
    public snakeCaseToCamelCase(str: string): string {
        if (!str) return '';
        let split = str.split('_');
        split = split.map(this.uppercaseFirstLetter);
        split[0] = this.lowercaseFirstLetter(split[0]);
        return split.join('');
    }

    /**
     * Converts camelCase string to snake_case
     * @param {string} str camelCase string
     * @returns str converted to snake_case
     */
    public camelCaseToSnakeCase(str: string): string {
        return str
            .split(/(?=[A-Z])/)
            .join('_')
            .toLowerCase();
    }

    private uppercaseFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private lowercaseFirstLetter(str: string) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
}
