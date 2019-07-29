import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConfigurationDialogComponent } from './create-configuration-dialog.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material';

describe('CreateConfigurationDialogComponent', () => {
    let component: CreateConfigurationDialogComponent;
    let fixture: ComponentFixture<CreateConfigurationDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, MatDialogModule],
            declarations: [CreateConfigurationDialogComponent],
            providers: [{ provide: MatDialogRef, useValue: {} }]
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
