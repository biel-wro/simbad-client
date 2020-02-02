import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsTableComponent } from './results-table.component';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ResultsTableComponent', () => {
    let component: ResultsTableComponent;
    let fixture: ComponentFixture<ResultsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResultsTableComponent],
            imports: [
                SharedModule,
                MatTableModule,
                MatSortModule,
                MatInputModule,
                MatPaginatorModule,
                MatTooltipModule,
                BrowserAnimationsModule
            ],
            providers: [provideMockStore({ initialState: {} })]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
