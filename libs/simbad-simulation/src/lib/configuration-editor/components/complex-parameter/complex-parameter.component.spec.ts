import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexParameterComponent } from './complex-parameter.component';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SimpleParameterComponent } from '../simple-parameter/simple-parameter.component';
import { provideMockStore } from '@ngrx/store/testing';
import { NotificationService } from '@simbad-client/app/core/core.module';

describe('ComplexParameterComponent', () => {
    let component: ComplexParameterComponent;
    let fixture: ComponentFixture<ComplexParameterComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TranslateModule.forRoot(), SharedModule],
            declarations: [ComplexParameterComponent, SimpleParameterComponent],
            providers: [
                FormBuilder,
                {
                    provide: NotificationService,
                    useValue: {
                        info: () => {}
                    }
                },
                provideMockStore({
                    initialState: {}
                })
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComplexParameterComponent);
        component = fixture.componentInstance;
        component.node = {
            definition: {
                className: 'final_estimator',
                isRoot: false,
                description: 'description',
                type: 'complex'
            },
            path: 'stream/final_estimator',
            simpleChildren: [
                {
                    definition: {
                        className: 'start_size',
                        isRoot: false,
                        description: 'description',
                        type: 'simple'
                    },
                    path: 'stream/final_estimator/start_size',
                    simpleChildren: [],
                    complexChildren: []
                }
            ],
            complexChildren: []
        };
        component.parentPath = '';
        const fb = TestBed.get(FormBuilder) as FormBuilder;
        component.form = fb.group({
            'stream/final_estimator/start_size': new FormControl(),
            'stream/final_estimator': new FormControl()
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
