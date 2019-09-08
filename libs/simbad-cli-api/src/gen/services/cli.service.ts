/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CliStatus } from '../models/cli-status';
import { CliTaskStatus } from '../models/cli-task-status';
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
  static readonly RunCliCommandPath = '/api/cli/run';

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

    const rb = new RequestBuilder(this.rootUrl, CliService.RunCliCommandPath, 'post');
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
   * Path part for operation getCliStatus
   */
  static readonly GetCliStatusPath = '/api/cli/status';

  /**
   * Get cli status
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCliStatus()` instead.
   *
   * This method doesn't expect any response body
   */
  getCliStatus$Response(params?: {

  }): Observable<StrictHttpResponse<CliStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CliService.GetCliStatusPath, 'get');
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
   * Get cli status
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCliStatus$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getCliStatus(params?: {

  }): Observable<CliStatus> {

    return this.getCliStatus$Response(params).pipe(
      map((r: StrictHttpResponse<CliStatus>) => r.body as CliStatus)
    );
  }

  /**
   * Path part for operation getCliTaskStatus
   */
  static readonly GetCliTaskStatusPath = '/api/cli/status/{taskId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCliTaskStatus()` instead.
   *
   * This method doesn't expect any response body
   */
  getCliTaskStatus$Response(params: {
    taskId: string;

  }): Observable<StrictHttpResponse<CliTaskStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CliService.GetCliTaskStatusPath, 'get');
    if (params) {

      rb.path('taskId', params.taskId);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CliTaskStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCliTaskStatus$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getCliTaskStatus(params: {
    taskId: string;

  }): Observable<CliTaskStatus> {

    return this.getCliTaskStatus$Response(params).pipe(
      map((r: StrictHttpResponse<CliTaskStatus>) => r.body as CliTaskStatus)
    );
  }

}
