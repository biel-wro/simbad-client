import { TestBed } from '@angular/core/testing';

import { ConfigurationSchemaProviderService } from './configuration-schema-provider.service';

describe('ConfigurationSchemaProviderService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ConfigurationSchemaProviderService = TestBed.get(
            ConfigurationSchemaProviderService
        );
        expect(service).toBeTruthy();
    });

    it('should return current configurationSchema', () => {
        // given
        const service: ConfigurationSchemaProviderService = TestBed.get(
            ConfigurationSchemaProviderService
        );

        // when
        const schema = service.getSchema();

        // then
        expect(schema).toBeTruthy();
        expect(schema.classMap).toBeTruthy();
        console.log(schema.classMap);
    });
});
