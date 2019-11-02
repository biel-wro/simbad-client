/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { SimulationInfo } from '../models/simulation-info';
import { SimulationStepInfo } from '../models/simulation-step-info';

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
   * Path part for operation getSimulationInfo
   */
  static readonly GetSimulationInfoPath = '/api/simulation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSimulationInfo()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimulationInfo$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<SimulationInfo>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/simulation/{id}', 'get');
    if (params) {

      rb.path('id', params.id);
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SimulationInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSimulationInfo$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimulationInfo(params: {
    id: string;

  }): Observable<SimulationInfo> {

    return this.getSimulationInfo$Response(params).pipe(
      map((r: StrictHttpResponse<SimulationInfo>) => r.body as SimulationInfo)
    );
  }

  /**
   * Path part for operation getSimulationStepInfo
   */
  static readonly GetSimulationStepInfoPath = '/api/step/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSimulationStepInfo()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimulationStepInfo$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<SimulationStepInfo>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/step/{id}', 'get');
    if (params) {

      rb.path('id', params.id);
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SimulationStepInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSimulationStepInfo$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimulationStepInfo(params: {
    id: string;

  }): Observable<SimulationStepInfo> {

    return this.getSimulationStepInfo$Response(params).pipe(
      map((r: StrictHttpResponse<SimulationStepInfo>) => r.body as SimulationStepInfo)
    );
  }

  /**
   * Path part for operation getArtifactInfo
   */
  static readonly GetArtifactInfoPath = '/api/artifact/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArtifactInfo()` instead.
   *
   * This method doesn't expect any response body
   */
  getArtifactInfo$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<SimulationStepInfo>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/artifact/{id}', 'get');
    if (params) {

      rb.path('id', params.id);
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SimulationStepInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArtifactInfo$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getArtifactInfo(params: {
    id: string;

  }): Observable<SimulationStepInfo> {

    return this.getArtifactInfo$Response(params).pipe(
      map((r: StrictHttpResponse<SimulationStepInfo>) => r.body as SimulationStepInfo)
    );
  }

}
