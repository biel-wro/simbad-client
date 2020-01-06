import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactListComponent } from './artifact-list.component';
import {
    MatDividerModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { MockComponent, MockPipe } from 'ng-mocks';
import { SmallInputActionComponent } from '@simbad-client/app/shared/small-input-action/small-input-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { IsPreviewEnabledPipe } from '@simbad-client/app/features/examples/simulation-pipeline/core/pipes/is-preview-enabled.pipe';

describe('ArtifactListComponent', () => {
    let component: ArtifactListComponent;
    let fixture: ComponentFixture<ArtifactListComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [
                ArtifactListComponent,
                MockComponent(SmallInputActionComponent),
                MockPipe(IsPreviewEnabledPipe)
            ],
            imports: [
                MatDividerModule,
                MatTableModule,
                MatSortModule,
                MatInputModule,
                MatPaginatorModule,
                MatTooltipModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtifactListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
