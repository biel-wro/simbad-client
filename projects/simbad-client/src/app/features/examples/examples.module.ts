import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

import { FEATURE_NAME, reducers } from './examples.state';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { TodosEffects } from './todos/todos.effects';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { CrudComponent } from './crud/components/crud.component';
import { BooksEffects } from './crud/books.effects';
import { FormComponent } from './form/components/form.component';
import { FormEffects } from './form/form.effects';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { ExamplesEffects } from './examples.effects';
import { UserComponent } from './simple-state-management/components/user.component';
import { UserService } from './simple-state-management/user.service';
import { ConfigurationStepComponent } from './form/components/configuration-step/configuration-step.component';
import { ComplexParameterComponent } from './form/components/complex-parameter/complex-parameter.component';
import { SimpleParameterComponent } from './form/components/simple-parameter/simple-parameter.component';
import { FormsService } from './form/forms-service';
import { CreateConfigurationDialogComponent } from './form/components/create-configuration-dialog/create-configuration-dialog.component';
import { FormToolbarComponent } from './form/components/form-toolbar/form-toolbar.component';
import { MatDialogModule } from '@angular/material';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(
        http,
        `${environment.i18nPrefix}/assets/i18n/examples/`,
        '.json'
    );
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
        EffectsModule.forFeature([
            ExamplesEffects,
            TodosEffects,
            StockMarketEffects,
            BooksEffects,
            FormEffects
        ]),
        MatDialogModule
    ],
    declarations: [
        ExamplesComponent,
        TodosContainerComponent,
        StockMarketContainerComponent,
        ParentComponent,
        ChildComponent,
        AuthenticatedComponent,
        CrudComponent,
        FormComponent,
        NotificationsComponent,
        UserComponent,
        ConfigurationStepComponent,
        ComplexParameterComponent,
        SimpleParameterComponent,
        CreateConfigurationDialogComponent,
        FormToolbarComponent
    ],
    providers: [StockMarketService, UserService, FormsService],
    entryComponents: [CreateConfigurationDialogComponent]
})
export class ExamplesModule {
    constructor() {}
}
