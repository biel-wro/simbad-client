import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsBrowserComponent } from './results-browser.component';
import { MockComponent } from 'ng-mocks';
import { ResultsTableComponent } from '@simbad-results/lib/components/results-table/results-table.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ResultsBrowserComponent', () => {
    let component: ResultsBrowserComponent;
    let fixture: ComponentFixture<ResultsBrowserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResultsBrowserComponent, MockComponent(ResultsTableComponent)],
            providers: [provideMockStore({ initialState: {} })]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsBrowserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
