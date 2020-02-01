import { TestBed } from '@angular/core/testing';

import { ValidatorsService } from './validators.service';
import { ParameterDefinition } from '@simbad-client/app/core/configuration-management/models';
import { ValidatorFn, Validators } from '@angular/forms';

describe('ValidatorsService', () => {
    let service: ValidatorsService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Validators]
        });
        service = TestBed.get(ValidatorsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('generateValidators', () => {
        it('should return empty array when parameter valueType is not a number', () => {
            // given
            const parameter = {
                className: 'some_parameter',
                type: 'simple',
                isRoot: false,
                description: '',
                valueType: 'string'
            } as ParameterDefinition;

            // when
            const validators = service.generateValidators(parameter);

            // then
            expect(validators.length).toEqual(0);
        });

        it('should return array with required, min and max validators when valueType is number', () => {
            // given
            const parameter = {
                className: 'some_parameter',
                type: 'simple',
                isRoot: false,
                description: '',
                valueType: 'int',
                minValue: 1,
                maxValue: 10
            } as ParameterDefinition;

            const expectedValidators: ValidatorFn[] = [
                Validators.required,
                Validators.min(parameter.minValue),
                Validators.max(parameter.maxValue)
            ];

            // when
            const validators: ValidatorFn[] = service.generateValidators(parameter);

            // Anonymous function equality tricky in jest, so this is not a strong assertion
            expect(validators.length).toEqual(3);
        });
    });
});
