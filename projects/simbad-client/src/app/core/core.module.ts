import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigurationSchemaProviderService } from './configuration-management/configuration-schema-provider.service';
import { ObjectsDefinitionsService } from './configuration-management/objects-definitions.service';
import { environment } from '../../environments/environment';

import { AppState, metaReducers, reducers, selectRouterState } from './core.state';
import { AuthEffects } from './auth/auth.effects';
import { selectAuth, selectIsAuthenticated } from './auth/auth.selectors';
import { authLogin, authLogout } from './auth/auth.actions';
import { AuthGuardService } from './auth/auth-guard.service';
import { TitleService } from './title/title.service';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { CustomSerializer } from './router/custom-serializer';
import { LocalStorageService } from './local-storage/local-storage.service';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { NotificationService } from './notifications/notification.service';
import { SettingsEffects } from './settings/settings.effects';
import {
    selectEffectiveTheme,
    selectSettingsLanguage,
    selectSettingsStickyHeader
} from './settings/settings.selectors';
import {
    ActionSettingsChangeLanguage,
    SettingsActions,
    SettingsActionTypes
} from './settings/settings.actions';

export {
    TitleService,
    selectAuth,
    authLogin,
    authLogout,
    AppState,
    LocalStorageService,
    selectIsAuthenticated,
    AuthGuardService,
    selectRouterState,
    NotificationService,
    SettingsActions,
    SettingsActionTypes,
    ActionSettingsChangeLanguage,
    selectEffectiveTheme,
    selectSettingsLanguage,
    selectSettingsStickyHeader,
    ConfigurationSchemaProviderService,
    ObjectsDefinitionsService
};

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/`, '.json');
}

@NgModule({
    imports: [
        // angular
        CommonModule,
        HttpClientModule,

        // ngrx
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([AuthEffects, SettingsEffects]),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument({
                name: 'Angular NgRx Material Starter',
                actionsBlocklist: [
                ]
            }),

        // 3rd party
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: RouterStateSerializer, useClass: CustomSerializer }
    ],
    exports: [TranslateModule]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
            parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }
}
