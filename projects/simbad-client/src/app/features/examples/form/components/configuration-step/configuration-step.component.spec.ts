import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationStepComponent } from './configuration-step.component';

describe('ConfigurationStepComponent', () => {
    let component: ConfigurationStepComponent;
    let fixture: ComponentFixture<ConfigurationStepComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfigurationStepComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfigurationStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
