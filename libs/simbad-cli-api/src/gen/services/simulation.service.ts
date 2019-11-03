/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { StartSimulationRequest } from '../models/start-simulation-request';
import { StartSimulationResponse } from '../models/start-simulation-response';

@Injectable({
  providedIn: 'root',
})
export class SimulationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation startSimulation
   */
  static readonly StartSimulationPath = '/api/simulation/start';

  /**
   * Starts simulation process
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startSimulation()` instead.
   *
   * This method sends `application:/json` and handles response body of type `application:/json`
   */
  startSimulation$Response(params?: {

    body?: StartSimulationRequest
  }): Observable<StrictHttpResponse<StartSimulationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/simulation/start', 'post');
    if (params) {

      rb.body(params.body, 'application:/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StartSimulationResponse>;
      })
    );
  }

  /**
   * Starts simulation process
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `startSimulation$Response()` instead.
   *
   * This method sends `application:/json` and handles response body of type `application:/json`
   */
  startSimulation(params?: {

    body?: StartSimulationRequest
  }): Observable<StartSimulationResponse> {

    return this.startSimulation$Response(params).pipe(
      map((r: StrictHttpResponse<StartSimulationResponse>) => r.body as StartSimulationResponse)
    );
  }

}
