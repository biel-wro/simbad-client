import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ParameterNameUtilsService {
    constructor() {}
    /**
     * Performs a very special operation
     *
     * @example
     * Simply call it with 2 numbers:
     * getResult(2, 3)
     *
     * @param {string} str String to change
     * @returns The sum of a and b
     */
    public snakeCaseToCamelCase(str: string): string {
        if (!str) return '';
        let split = str.split('_');
        split = split.map(this.uppercaseFirstLetter);
        split[0] = this.lowercaseFirstLetter(split[0]);
        return split.join('');
    }

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
