import { TestBed } from '@angular/core/testing';
import { ParameterNameUtilsService } from './parameter-name-utils.service';

describe('ParameterNameUtilsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ParameterNameUtilsService = TestBed.get(ParameterNameUtilsService);
        expect(service).toBeTruthy();
    });

    describe('snakeCaseToCamelCase', () => {
        it('should convert snake_case to camelCase', () => {
            // given
            const service: ParameterNameUtilsService = TestBed.get(ParameterNameUtilsService);
            const input = 'snake_case';
            const expected = 'snakeCase';

            // when
            const actual = service.snakeCaseToCamelCase(input);

            // then
            expect(actual).toEqual(expected);
        });
    });

    describe('camelCaseToSnakeCase', () => {
        it('should convert snake_case to camelCase', () => {
            // given
            const service: ParameterNameUtilsService = TestBed.get(ParameterNameUtilsService);
            const input = 'snakeCase';
            const expected = 'snake_case';

            // when
            const actual = service.camelCaseToSnakeCase(input);

            // then
            expect(actual).toEqual(expected);
        });
    });
});
