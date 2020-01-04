/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { OpenLocationRequest } from '../models/open-location-request';

@Injectable({
    providedIn: 'root'
})
export class ArtifactsService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation openLocation
     */
    static readonly OpenLocationPath = '/host/open';

    /**
     * Opens default system file manager at given path
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `openLocation()` instead.
     *
     * This method sends `application:/json` and handles response body of type `application:/json`
     */
    openLocation$Response(params?: { body?: OpenLocationRequest }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, '/host/open', 'post');
        if (params) {
            rb.body(params.body, 'application:/json');
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'text',
                    accept: '*/*'
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
                })
            );
    }

    /**
     * Opens default system file manager at given path
     *
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `openLocation$Response()` instead.
     *
     * This method sends `application:/json` and handles response body of type `application:/json`
     */
    openLocation(params?: { body?: OpenLocationRequest }): Observable<void> {
        return this.openLocation$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
