import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '@simbad-client/app/shared/shared.module';

import { SimulationComponent } from './simulation.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('simulationComponent', () => {
    let component: SimulationComponent;
    let fixture: ComponentFixture<SimulationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                SharedModule,
                NoopAnimationsModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                provideMockStore({
                    initialState: {
                        auth: {
                            isAuthenticated: false
                        }
                    }
                })
            ],
            declarations: [SimulationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimulationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
