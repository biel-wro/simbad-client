import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '@simbad-client/app/shared/shared.module';

import { simulationComponent } from './simulation.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('simulationComponent', () => {
    let component: simulationComponent;
    let fixture: ComponentFixture<simulationComponent>;

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
            declarations: [simulationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(simulationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
