import { ModuleWithProviders } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export interface IEnvironment {
    production: boolean;
    hmr: boolean;
    version: string;
    appName: string;
    test: false;
    i18nPrefix: string;
    instrumentation: ModuleWithProviders<StoreDevtoolsModule> | [];
}
