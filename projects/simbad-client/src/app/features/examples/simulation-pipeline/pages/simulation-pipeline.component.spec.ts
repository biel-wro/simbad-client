import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulationPipelineComponent } from './simulation-pipeline.component';
import { MatStepperModule } from '@angular/material';
import { MockComponent } from 'ng-mocks';
import { UploadConfigurationButtonComponent } from '@simbad-client/app/features/examples/common/upload-configuration-button/upload-configuration-button.component';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { CliStepComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/steps/cli-step/cli-step.component';
import { AnalyzerStepComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/steps/analyzer-step/analyzer-step.component';
import { ReportStepComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/steps/report-step/report-step.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigurationFormState } from '@simbad-client/app/features/examples/configuration-editor/store/form.model';
import { SimulationPipelineState } from '@simbad-client/app/features/examples/simulation-pipeline/core/store/simulation/simulation-pipeline.reducer';

describe('SimulationPipelineComponent', () => {
    let component: SimulationPipelineComponent;
    let fixture: ComponentFixture<SimulationPipelineComponent>;

    const simulationState: SimulationPipelineState = {
        isSimulationRunning: true
    };

    const formState: ConfigurationFormState = {
        formValue: {},
        rootObjectClassNames: [],
        configurationName: 'example_name'
    };

    const initialState = {
        form: formState,
        simulation: simulationState
    };

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [
                SimulationPipelineComponent,
                MockComponent(UploadConfigurationButtonComponent),
                MockComponent(CliStepComponent),
                MockComponent(AnalyzerStepComponent),
                MockComponent(ReportStepComponent)
            ],
            imports: [SharedModule, MatStepperModule],
            providers: [provideMockStore({ initialState })]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimulationPipelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
