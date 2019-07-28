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

    public getSchema(): any {
        return this.schema.default;
    }
}
