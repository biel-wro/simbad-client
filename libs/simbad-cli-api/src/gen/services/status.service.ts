/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ArtifactInfo } from '../models/artifact-info';
import { SimulationInfo } from '../models/simulation-info';
import { SimulationRangeRequest } from '../models/simulation-range-request';
import { SimulationSimpleInfo } from '../models/simulation-simple-info';
import { SimulationStatus } from '../models/simulation-status';
import { SimulationStepInfo } from '../models/simulation-step-info';

@Injectable({
  providedIn: 'root',
})
export class StatusService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getSimulationStatus
   */
  static readonly GetSimulationStatusPath = '/api/simulation/status';

  /**
   * Get SimulationStatus
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSimulationStatus()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimulationStatus$Response(params?: {

  }): Observable<StrictHttpResponse<SimulationStatus>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/simulation/status', 'get');
    if (params) {

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SimulationStatus>;
      })
    );
  }

  /**
   * Get SimulationStatus
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSimulationStatus$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimulationStatus(params?: {

  }): Observable<SimulationStatus> {

    return this.getSimulationStatus$Response(params).pipe(
      map((r: StrictHttpResponse<SimulationStatus>) => r.body as SimulationStatus)
    );
  }

  /**
   * Path part for operation getLatestSimulation
   */
  static readonly GetLatestSimulationPath = '/api/simulation/latest';

  /**
   * Get latest stimulation data
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLatestSimulation()` instead.
   *
   * This method doesn't expect any response body
   */
  getLatestSimulation$Response(params?: {

  }): Observable<StrictHttpResponse<SimulationInfo>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/simulation/latest', 'get');
    if (params) {

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
   * Get latest stimulation data
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLatestSimulation$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getLatestSimulation(params?: {

  }): Observable<SimulationInfo> {

    return this.getLatestSimulation$Response(params).pipe(
      map((r: StrictHttpResponse<SimulationInfo>) => r.body as SimulationInfo)
    );
  }

  /**
   * Path part for operation getSimulationInfo
   */
  static readonly GetSimulationInfoPath = '/api/simulation/status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSimulationInfo()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimulationInfo$Response(params: {
    id: string;

  }): Observable<StrictHttpResponse<SimulationInfo>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/simulation/status/{id}', 'get');
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
  static readonly GetSimulationStepInfoPath = '/api/simulation/step/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSimulationStepInfo()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimulationStepInfo$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<SimulationStepInfo>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/simulation/step/{id}', 'get');
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
    id: number;

  }): Observable<SimulationStepInfo> {

    return this.getSimulationStepInfo$Response(params).pipe(
      map((r: StrictHttpResponse<SimulationStepInfo>) => r.body as SimulationStepInfo)
    );
  }

  /**
   * Path part for operation getLatestSimulations
   */
  static readonly GetLatestSimulationsPath = '/api/simulation/range/latest';

  /**
   * Get n latest simulation id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLatestSimulations()` instead.
   *
   * This method sends `application:/json` and handles response body of type `application:/json`
   */
  getLatestSimulations$Response(params?: {

    body?: SimulationRangeRequest
  }): Observable<StrictHttpResponse<Array<SimulationSimpleInfo>>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/simulation/range/latest', 'get');
    if (params) {

      rb.body(params.body, 'application:/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SimulationSimpleInfo>>;
      })
    );
  }

  /**
   * Get n latest simulation id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLatestSimulations$Response()` instead.
   *
   * This method sends `application:/json` and handles response body of type `application:/json`
   */
  getLatestSimulations(params?: {

    body?: SimulationRangeRequest
  }): Observable<Array<SimulationSimpleInfo>> {

    return this.getLatestSimulations$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SimulationSimpleInfo>>) => r.body as Array<SimulationSimpleInfo>)
    );
  }

  /**
   * Path part for operation getSimulationsAfterId
   */
  static readonly GetSimulationsAfterIdPath = '/api/simulation/range/chunk';

  /**
   * Get n latest simulation after speific id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSimulationsAfterId()` instead.
   *
   * This method sends `application:/json` and handles response body of type `application:/json`
   */
  getSimulationsAfterId$Response(params?: {

    body?: SimulationRangeRequest
  }): Observable<StrictHttpResponse<Array<SimulationSimpleInfo>>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/simulation/range/chunk', 'get');
    if (params) {

      rb.body(params.body, 'application:/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SimulationSimpleInfo>>;
      })
    );
  }

  /**
   * Get n latest simulation after speific id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSimulationsAfterId$Response()` instead.
   *
   * This method sends `application:/json` and handles response body of type `application:/json`
   */
  getSimulationsAfterId(params?: {

    body?: SimulationRangeRequest
  }): Observable<Array<SimulationSimpleInfo>> {

    return this.getSimulationsAfterId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SimulationSimpleInfo>>) => r.body as Array<SimulationSimpleInfo>)
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

  }): Observable<StrictHttpResponse<ArtifactInfo>> {

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
        return r as StrictHttpResponse<ArtifactInfo>;
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

  }): Observable<ArtifactInfo> {

    return this.getArtifactInfo$Response(params).pipe(
      map((r: StrictHttpResponse<ArtifactInfo>) => r.body as ArtifactInfo)
    );
  }

  /**
   * Path part for operation downloadArtifact
   */
  static readonly DownloadArtifactPath = '/api/artifact/{id}/download';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadArtifact()` instead.
   *
   * This method doesn't expect any response body
   */
  downloadArtifact$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, '/api/artifact/{id}/download', 'get');
    if (params) {

      rb.path('id', params.id);
    }
    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadArtifact$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  downloadArtifact(params: {
    id: number;

  }): Observable<Blob> {

    return this.downloadArtifact$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
