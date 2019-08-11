/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CliOperationProgress } from '../models/cli-operation-progress';
import { CliStatus } from '../models/cli-status';
import { RunCliCommandRequest } from '../models/run-cli-command-request';
import { RunCliCommandResponse } from '../models/run-cli-command-response';

@Injectable({
  providedIn: 'root',
})
export class CliService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation runCliCommand
   */
  static readonly RunCliCommandPath = '/run';

  /**
   * Executes command using simbad-cli binary
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `runCliCommand()` instead.
   *
   * This method sends `application:/json` and handles response body of type `application:/json`
   */
  runCliCommand$Response(params?: {

    body?: RunCliCommandRequest
  }): Observable<StrictHttpResponse<RunCliCommandResponse>> {

    const rb = new RequestBuilder(this.rootUrl, '/run', 'post');
    if (params) {

      rb.body(params.body, 'application:/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RunCliCommandResponse>;
      })
    );
  }

  /**
   * Executes command using simbad-cli binary
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `runCliCommand$Response()` instead.
   *
   * This method sends `application:/json` and handles response body of type `application:/json`
   */
  runCliCommand(params?: {

    body?: RunCliCommandRequest
  }): Observable<RunCliCommandResponse> {

    return this.runCliCommand$Response(params).pipe(
      map((r: StrictHttpResponse<RunCliCommandResponse>) => r.body as RunCliCommandResponse)
    );
  }

  /**
   * Path part for operation getSimbadCliStatus
   */
  static readonly GetSimbadCliStatusPath = '/status';

  /**
   * Get cli operation status
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSimbadCliStatus()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimbadCliStatus$Response(params?: {

  }): Observable<StrictHttpResponse<CliStatus>> {

    const rb = new RequestBuilder(this.rootUrl, '/status', 'get');
    if (params) {

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CliStatus>;
      })
    );
  }

  /**
   * Get cli operation status
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSimbadCliStatus$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getSimbadCliStatus(params?: {

  }): Observable<CliStatus> {

    return this.getSimbadCliStatus$Response(params).pipe(
      map((r: StrictHttpResponse<CliStatus>) => r.body as CliStatus)
    );
  }

  /**
   * Path part for operation getCliOperationProgress
   */
  static readonly GetCliOperationProgressPath = '/progress';

  /**
   * Get cli operation progress
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCliOperationProgress()` instead.
   *
   * This method doesn't expect any response body
   */
  getCliOperationProgress$Response(params?: {

  }): Observable<StrictHttpResponse<CliOperationProgress>> {

    const rb = new RequestBuilder(this.rootUrl, '/progress', 'get');
    if (params) {

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CliOperationProgress>;
      })
    );
  }

  /**
   * Get cli operation progress
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCliOperationProgress$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getCliOperationProgress(params?: {

  }): Observable<CliOperationProgress> {

    return this.getCliOperationProgress$Response(params).pipe(
      map((r: StrictHttpResponse<CliOperationProgress>) => r.body as CliOperationProgress)
    );
  }

}
