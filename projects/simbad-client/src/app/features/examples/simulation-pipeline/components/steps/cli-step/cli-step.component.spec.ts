import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliStepComponent } from './cli-step.component';
import { MockComponent } from 'ng-mocks';
import { PerformanceMonitorComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/common/performance-monitor/performance-monitor.component';
import { TaskContextComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/common/task-context/task-context.component';
import { ArtifactListComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/common/artifact-list/artifact-list.component';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material';
import { provideMockStore } from '@ngrx/store/testing';

describe('CliStepComponent', () => {
    let component: CliStepComponent;
    let fixture: ComponentFixture<CliStepComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [
                CliStepComponent,
                MockComponent(PerformanceMonitorComponent),
                MockComponent(TaskContextComponent),
                MockComponent(ArtifactListComponent)
            ],
            imports: [SharedModule, MatProgressBarModule],
            providers: [provideMockStore({ initialState: {} })]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CliStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
