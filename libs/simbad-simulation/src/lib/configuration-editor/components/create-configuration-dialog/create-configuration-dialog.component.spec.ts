import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConfigurationDialogComponent } from './create-configuration-dialog.component';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { provideMockStore } from '@ngrx/store/testing';

describe('ImagePreviewDialogComponent', () => {
    let component: CreateConfigurationDialogComponent;
    let fixture: ComponentFixture<CreateConfigurationDialogComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [SharedModule, MatDialogModule],
            declarations: [CreateConfigurationDialogComponent],
            providers: [{ provide: MatDialogRef, useValue: {} }, provideMockStore({ initialState: {} })]
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
