import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactListComponent } from './artifact-list.component';
import { MatDividerModule } from '@angular/material';
import { MockComponent } from 'ng-mocks';
import { InfoListComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/common/info-list/info-list.component';

describe('ArtifactListComponent', () => {
    let component: ArtifactListComponent;
    let fixture: ComponentFixture<ArtifactListComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [ArtifactListComponent, MockComponent(InfoListComponent)],
            imports: [MatDividerModule]
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
