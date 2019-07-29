import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms-service';
import { FormBuilder } from '@angular/forms';

describe('FormsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [FormBuilder]
        })
    );

    it('should be created', () => {
        const service: FormsService = TestBed.get(FormsService);
        expect(service).toBeTruthy();
    });

    describe('deepAssign', () => {
        it('should correctly assign surface level property', () => {
            // given
            const service: FormsService = TestBed.get(FormsService);
            const obj = {};
            const property = 'surface';
            const value = 'test';

            // when
            service.deepAssign(obj, property, value);

            // then
            expect(obj[property]).toBeDefined();
            console.log(obj);
        });
    });
});
