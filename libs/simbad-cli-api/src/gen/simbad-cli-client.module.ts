/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { CliService } from './services/cli.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CliService,
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

  constructor( 
    @Optional() @SkipSelf() parentModule: SimbadCliClientModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('SimbadCliClientModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
