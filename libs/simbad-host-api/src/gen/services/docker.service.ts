/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class DockerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation setupPipeline
   */
  static readonly SetupPipelinePath = '/host/setup';

  /**
   * Starts docker containers relating to pipeline
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setupPipeline()` instead.
   *
   * This method doesn't expect any response body
   */
  setupPipeline$Response(params?: {

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, '/host/setup', 'post');
    if (params) {

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Starts docker containers relating to pipeline
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setupPipeline$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  setupPipeline(params?: {

  }): Observable<void> {

    return this.setupPipeline$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation teardownPipeline
   */
  static readonly TeardownPipelinePath = '/host/teardown';

  /**
   * Shutdowns docker containers relating to pipeline
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `teardownPipeline()` instead.
   *
   * This method doesn't expect any response body
   */
  teardownPipeline$Response(params?: {

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, '/host/teardown', 'post');
    if (params) {

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Shutdowns docker containers relating to pipeline
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `teardownPipeline$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  teardownPipeline(params?: {

  }): Observable<void> {

    return this.teardownPipeline$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
