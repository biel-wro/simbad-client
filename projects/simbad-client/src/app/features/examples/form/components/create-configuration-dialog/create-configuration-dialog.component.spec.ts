import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConfigurationDialogComponent } from './create-configuration-dialog.component';

describe('CreateConfigurationDialogComponent', () => {
    let component: CreateConfigurationDialogComponent;
    let fixture: ComponentFixture<CreateConfigurationDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateConfigurationDialogComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateConfigurationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
