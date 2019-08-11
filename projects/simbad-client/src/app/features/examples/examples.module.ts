import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

import { FEATURE_NAME, reducers } from './examples.state';
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
import { MatDialogModule } from '@angular/material';

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
        EffectsModule.forFeature([ExamplesEffects, FormEffects]),
        MatDialogModule
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
        FormToolbarComponent
    ],
    providers: [FormsService],
    entryComponents: [CreateConfigurationDialogComponent]
})
export class ExamplesModule {
    constructor() {}
}
