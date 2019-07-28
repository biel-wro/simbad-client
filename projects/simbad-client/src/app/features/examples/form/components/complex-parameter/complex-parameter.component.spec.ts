import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexParameterComponent } from './complex-parameter.component';

describe('ComplexParameterComponent', () => {
    let component: ComplexParameterComponent;
    let fixture: ComponentFixture<ComplexParameterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComplexParameterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComplexParameterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
