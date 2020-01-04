/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { HostService } from './services/host.service';
import { ArtifactsService } from './services/artifacts.service';
import { DockerService } from './services/docker.service';

/**
 * Module that provides all services and configuration.
 * Also exports Angular's `HttpClientModule`, as it is required for all services.
 */
@NgModule({
    imports: [HttpClientModule],
    exports: [HttpClientModule],
    declarations: [],
    providers: [HostService, ArtifactsService, DockerService, ApiConfiguration]
})
export class SimbadHostClientModule {
    static forRoot(params: ApiConfigurationParams): ModuleWithProviders {
        return {
            ngModule: SimbadHostClientModule,
            providers: [
                {
                    provide: ApiConfiguration,
                    useValue: params
                }
            ]
        };
    }
}
