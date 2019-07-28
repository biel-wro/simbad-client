import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleParameterComponent } from './simple-parameter.component';

describe('SimpleParameterComponent', () => {
    let component: SimpleParameterComponent;
    let fixture: ComponentFixture<SimpleParameterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleParameterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleParameterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
