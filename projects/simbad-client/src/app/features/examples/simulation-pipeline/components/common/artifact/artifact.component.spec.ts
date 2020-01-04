import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactComponent } from './artifact.component';
import { MockComponent } from 'ng-mocks';
import { InfoListComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/common/info-list/info-list.component';

describe('ArtifactComponent', () => {
    let component: ArtifactComponent;
    let fixture: ComponentFixture<ArtifactComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [ArtifactComponent, MockComponent(InfoListComponent)]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtifactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
