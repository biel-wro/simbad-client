import { TestBed } from '@angular/core/testing';

import { ObjectUtilsService } from './object-utils.service';

describe('ObjectUtilsService', () => {
    let service: ObjectUtilsService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(ObjectUtilsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('deepAssign', () => {
        it('should correctly assign surface level property', () => {
            // given
            const obj = {};
            const property = 'surface';
            const value = 'test';

            // when
            service.deepAssign(obj, property, value);

            // then
            expect(obj[property]).toBeDefined();
        });

        it('should correctly assign deep level property', () => {
            // given
            const obj = {};
            const property = 'deep/under/surface';
            const value = 'test';

            // when
            service.deepAssign(obj, property, value);

            // then
            expect(obj['deep']['under']['surface']).toBeDefined();
        });
    });
});
