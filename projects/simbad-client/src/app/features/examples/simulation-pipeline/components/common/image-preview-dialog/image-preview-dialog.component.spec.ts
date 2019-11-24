import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewDialogComponent } from './image-preview-dialog.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { provideMockStore } from '@ngrx/store/testing';

describe('ImagePreviewDialogComponent', () => {
    let component: ImagePreviewDialogComponent;
    let fixture: ComponentFixture<ImagePreviewDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, MatDialogModule],
            declarations: [ImagePreviewDialogComponent],
            providers: [{ provide: MatDialogRef, useValue: {} }, provideMockStore({ initialState: {} })]
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
