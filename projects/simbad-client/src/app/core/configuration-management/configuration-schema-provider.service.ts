import { Injectable } from '@angular/core';
import * as configurationSchema from './schemas/configurationSchema.json';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationSchemaProviderService {
    private readonly schema: any;
    constructor() {
        this.schema = configurationSchema;
    }

    /**
     * Returns current parameter schema defined in configurationSchema.json file
     * @returns object containing parameter definitions in format { className: definition}
     */
    public getSchema(): any {
        return this.schema.default;
    }
}
