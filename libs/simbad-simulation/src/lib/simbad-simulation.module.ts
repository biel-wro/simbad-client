import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { environment } from '@simbad-client/environments/environment';

import { FEATURE_NAME, reducers } from './simulationState';
import { SimbadSimulationRoutingModule } from './simbad-simulation-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { FormComponent } from './configuration-editor/components/configuration-form/form.component';
import { FormEffects } from './configuration-editor/store/form.effects';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { ExamplesEffects } from './examples.effects';
import { ConfigurationStepComponent } from './configuration-editor/components/configuration-step/configuration-step.component';
import { ComplexParameterComponent } from './configuration-editor/components/complex-parameter/complex-parameter.component';
import { SimpleParameterComponent } from './configuration-editor/components/simple-parameter/simple-parameter.component';
import { FormsService } from './configuration-editor/services/forms.service';
import { CreateConfigurationDialogComponent } from './configuration-editor/components/create-configuration-dialog/create-configuration-dialog.component';
import { FormToolbarComponent } from './configuration-editor/components/form-toolbar/form-toolbar.component';
import {
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule
} from '@angular/material';
import { SimulationPipelineComponent } from '@simbad-simulation/lib/simulation-pipeline/pages/simulation-pipeline.component';
import { TaskContextComponent } from '@simbad-simulation/lib/simulation-pipeline/components/common/task-context/task-context.component';
import { StatusTileComponent } from '@simbad-simulation/lib/simulation-pipeline/components/common/status-tile/status-tile.component';
import { PerformanceMonitorComponent } from '@simbad-simulation/lib/simulation-pipeline/components/common/performance-monitor/performance-monitor.component';
import { ArtifactListComponent } from '@simbad-simulation/lib/simulation-pipeline/components/common/artifact-list/artifact-list.component';
import { CliStepComponent } from '@simbad-simulation/lib/simulation-pipeline/components/steps/cli-step/cli-step.component';
import { AnalyzerStepComponent } from '@simbad-simulation/lib/simulation-pipeline/components/steps/analyzer-step/analyzer-step.component';
import { UploadConfigurationButtonComponent } from './common/upload-configuration-button/upload-configuration-button.component';
import { InfoListComponent } from './simulation-pipeline/components/common/info-list/info-list.component';
import { InfoListElementComponent } from './simulation-pipeline/components/common/info-list-element/info-list-element.component';
import { SimulationPipelineEffects } from '@simbad-simulation/lib/simulation-pipeline/core/store/simulation/simulation-pipeline.effects';
import { ReportStepComponent } from '@simbad-simulation/lib/simulation-pipeline/components/steps/report-step/report-step.component';
import { ImagePreviewDialogComponent } from '@simbad-simulation/lib/simulation-pipeline/components/common/image-preview-dialog/image-preview-dialog.component';
import { ArtifactsEffects } from '@simbad-simulation/lib/simulation-pipeline/core/store/artifacts/artifacts.effects';
import { IsPreviewEnabledPipe } from './simulation-pipeline/core/pipes/is-preview-enabled.pipe';
import { FormatBytesPipe } from './simulation-pipeline/core/pipes/format-bytes.pipe';
import { ScrollToTopButtonComponent } from './configuration-editor/components/scroll-to-top-button/scroll-to-top-button.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/examples/`, '.json');
}

@NgModule({
    imports: [
        SharedModule,
        SimbadSimulationRoutingModule,
        StoreModule.forFeature(FEATURE_NAME, reducers),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: true
        }),
        EffectsModule.forFeature(
            [
                ExamplesEffects,
                FormEffects,
                SimulationPipelineEffects,
                ArtifactsEffects
            ]
        ),
        MatDialogModule,
        MatStepperModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    declarations: [
        ExamplesComponent,
        AuthenticatedComponent,
        FormComponent,
        NotificationsComponent,
        ConfigurationStepComponent,
        ComplexParameterComponent,
        SimpleParameterComponent,
        CreateConfigurationDialogComponent,
        FormToolbarComponent,
        SimulationPipelineComponent,
        StatusTileComponent,
        PerformanceMonitorComponent,
        CliStepComponent,
        ArtifactListComponent,
        TaskContextComponent,
        UploadConfigurationButtonComponent,
        InfoListComponent,
        InfoListElementComponent,
        AnalyzerStepComponent,
        ReportStepComponent,
        ImagePreviewDialogComponent,
        IsPreviewEnabledPipe,
        FormatBytesPipe,
        ScrollToTopButtonComponent
    ],
    providers: [FormsService],
    entryComponents: [CreateConfigurationDialogComponent, ImagePreviewDialogComponent]
})
export class SimbadSimulationModule {
    constructor() {
    }
}
