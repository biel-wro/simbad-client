import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewDialogComponent } from './image-preview-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@simbad-client/app/shared/shared.module';

describe('ImagePreviewDialogComponent', () => {
    let component: ImagePreviewDialogComponent;
    let fixture: ComponentFixture<ImagePreviewDialogComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [SharedModule, MatDialogModule],
            declarations: [ImagePreviewDialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                provideMockStore({ initialState: {} })
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImagePreviewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
