/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { StatusService } from './services/status.service';
import { SimulationService } from './services/simulation.service';

/**
 * Module that provides all services and configuration.
 * Also exports Angular's `HttpClientModule`, as it is required for all services.
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    StatusService,
    SimulationService,
    ApiConfiguration
  ],
})
export class SimbadCliClientModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders {
    return {
      ngModule: SimbadCliClientModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }
}
