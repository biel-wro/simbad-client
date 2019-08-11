/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '';
}

/**
 * Parameters for `SimbadCliClientModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
