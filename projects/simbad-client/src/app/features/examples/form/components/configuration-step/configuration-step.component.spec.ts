import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationStepComponent } from './configuration-step.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ComplexParameterComponent } from '../complex-parameter/complex-parameter.component';
import { SimpleParameterComponent } from '../simple-parameter/simple-parameter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormControl } from '@angular/forms';

describe('ConfigurationStepComponent', () => {
    let component: ConfigurationStepComponent;
    let fixture: ComponentFixture<ConfigurationStepComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, NoopAnimationsModule],
            declarations: [ConfigurationStepComponent, ComplexParameterComponent, SimpleParameterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfigurationStepComponent);
        component = fixture.componentInstance;
        component.node = {
            definition: {
                className: 'final_estimator',
                isRoot: false,
                description: 'description',
                type: 'complex'
            },
            path: 'stream.final_estimator',
            simpleChildren: [
                {
                    definition: {
                        className: 'start_size',
                        isRoot: false,
                        description: 'description',
                        type: 'simple'
                    },
                    path: 'stream.final_estimator.start_size',
                    simpleChildren: [],
                    complexChildren: []
                }
            ],
            complexChildren: []
        };
        const fb = TestBed.get(FormBuilder) as FormBuilder;
        component.form = fb.group({
            'stream.final_estimator.start_size': new FormControl(),
            'stream.final_estimator': new FormControl()
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
