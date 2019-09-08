import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

import { FEATURE_NAME, reducers } from './simulationState';
import { ExamplesRoutingModule } from './examples-routing.module';
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
import { MatDialogModule, MatStepperModule } from '@angular/material';
import { SimulationPipelineComponent } from '@simbad-client/app/features/examples/simulation-pipeline/pages/simulation-pipeline.component';
import { TaskContextComponent } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/task-context/task-context.component';
import { StatusTileComponent } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/status-tile/status-tile.component';
import { PerformanceMonitorComponent } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/performance-monitor/performance-monitor.component';
import { ArtifactListComponent } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/artifact-list/artifact-list.component';
import { CliStepComponent } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/components/cli-step/cli-step.component';
import { CliStepEffects } from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/store/cli-step.effects';
import { UploadConfigurationButtonComponent } from './common/upload-configuration-button/upload-configuration-button.component';
import { InfoListComponent } from './simulation-pipeline/cli-step/components/info-list/info-list.component';
import { InfoListElementComponent } from './simulation-pipeline/cli-step/components/info-list-element/info-list-element.component';
import { ArtifactComponent } from './simulation-pipeline/cli-step/components/artifact/artifact.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/examples/`, '.json');
}

@NgModule({
    imports: [
        SharedModule,
        ExamplesRoutingModule,
        StoreModule.forFeature(FEATURE_NAME, reducers),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: true
        }),
        EffectsModule.forFeature([ExamplesEffects, FormEffects, CliStepEffects]),
        MatDialogModule,
        MatStepperModule
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
        ArtifactComponent
    ],
    providers: [FormsService],
    entryComponents: [CreateConfigurationDialogComponent]
})
export class ExamplesModule {
    constructor() {
    }
}
