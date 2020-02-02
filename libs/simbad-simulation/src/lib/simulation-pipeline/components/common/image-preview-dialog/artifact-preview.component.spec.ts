import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactPreviewComponent } from './artifact-preview.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@simbad-client/app/shared/shared.module';

describe('ImagePreviewDialogComponent', () => {
    let component: ArtifactPreviewComponent;
    let fixture: ComponentFixture<ArtifactPreviewComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [SharedModule, MatDialogModule],
            declarations: [ArtifactPreviewComponent],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                provideMockStore({ initialState: {} })
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtifactPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
