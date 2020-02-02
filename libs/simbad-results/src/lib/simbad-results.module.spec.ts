import { async, TestBed } from '@angular/core/testing';
import { SimbadResultsModule } from './simbad-results.module';

describe('SimbadResultsModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SimbadResultsModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(SimbadResultsModule).toBeDefined();
    });
});
