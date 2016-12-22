import { Observable } from 'rxjs/Rx';
import { ExceptionHandler } from '../../exception-module/services/exception-handler.service';
import { SERVICE_CONSTANTS } from '../../app.constants';
import { REQUEST_GATEWAY_HTTP_HEADERS } from '../request.constants';
const URI: any = require('uri-template-lite').URI;

export class RequestBuilder {
  private static $inject: string[] = ['$http', 'exceptionHandler'];

  public constructor(
    private $http: ng.IHttpService,
    private exceptionHandler: ExceptionHandler) {}

  public build(method: string, path: string, pathParams?: any, queryParams?: any,
    body?: any, responseType?: string, additionalHeaders?: any, root?: string): Observable<any> {
      let url: string = this.buildPath(root, path, pathParams),
        headers: any = {};

      if (responseType === 'json') {
        headers['Content-Type'] = 'application/json';
      }

      return Observable.defer(() => {
        return Observable.fromPromise(this.$http({
          method: method,
          url: url,
          params: queryParams,
          data: body,
          responseType: responseType,
          timeout: SERVICE_CONSTANTS.TIMEOUT,
          headers: angular.extend(headers, additionalHeaders || REQUEST_GATEWAY_HTTP_HEADERS)
        }));
      }).catch((err: any, caught: Observable<any>) => {
        let exception: Error =
          new Error('Request Error: ' + method + ' ' + url + ', status: ' + err.status);
        this.exceptionHandler.handle(exception);
        return Observable.throw(exception);
      }).map((data: any) => {
        return data.data;
      });
  }

  public buildPath(root: string, path: string, pathParams?: any): string {
    let url: string = (root || SERVICE_CONSTANTS.API_GATEWAY) + path;

    if (pathParams) {
      url = URI.expand(url, pathParams);
    }

    return url;
  }

  public json(method: string, path: string, pathParams?: any, queryParams?: any,
    body?: any, additionalHeaders?: any, root?: string): Observable<any> {
    return this.build(method, path, pathParams, queryParams, body, 'json', additionalHeaders, root);
  }

  public getJson(path: string, pathParams?: any, queryParams?: any,
    additionalHeaders?: any, root?: string): Observable<any> {
    return this.json('GET', path, pathParams, queryParams, null, additionalHeaders, root);
  }

  public postJson(path: string, pathParams?: any, queryParams?: any,
    body?: any, additionalHeaders?: any, root?: string): Observable<any> {
    return this.json('POST', path, pathParams, queryParams, body, additionalHeaders, root);
  }

  public putJson(path: string, pathParams?: any, queryParams?: any,
    body?: any, additionalHeaders?: any, root?: string): Observable<any> {
    return this.json('PUT', path, pathParams, queryParams, body, additionalHeaders, root);
  }

  public deleteJson(path: string, pathParams?: any, queryParams?: any,
    additionalHeaders?: any, root?: string): Observable<any> {
    return this.json('DELETE', path, pathParams, queryParams, null, additionalHeaders, root);
  }

  public sse(path: string, pathParams?: any, json?: boolean, root?: string): Observable<any> {
    let url: string = this.buildPath(root || SERVICE_CONSTANTS.SSE_GATEWAY, path, pathParams),
      observable: Observable<any> = Observable.create(observer => {
        let eventSource: EventSource = new EventSource(url);
        eventSource.onmessage = x => observer.next(x.data);
        eventSource.onerror = err => observer.error(err);
        return () => {
          eventSource.close();
          eventSource = null;
        };
      }).catch((err: any, caught: Observable<any>) => {
        let exception: Error =
          new Error('SSE Request Error: ' + url);
        this.exceptionHandler.handle(exception);
        return Observable.throw(exception);
      });

    if (json) {
      observable = observable.map((data: any) => {
        let result: any = data;

        if (angular.isString(data)) {
          try {
            result = JSON.parse(data);
          } catch (err) {
            this.exceptionHandler.handle(err);
            result = {};
          }
        }

        return result;
      });
    }

    return observable;
  }

  public websocket(url: string, pathParams?: any): Observable<any> {
    return Observable.webSocket(this.buildPath(null, url, pathParams));
  }
}
