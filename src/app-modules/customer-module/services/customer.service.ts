/**
 * @module Customer
 */
 /** */

import { Observable } from 'rxjs/Rx';
import { RequestBuilder } from '../../../common-modules/request-module/services/request-builder.service';


/**
 * Customer Service
 */
export class CustomerService {
  private static $inject: string[] = ['$http', 'requestBuilder'];

  /**
   * Constructor
   *
   * @param $http AngularJS $http service
   * @param requestBuilder Request Builder helper
   *
   */
  public constructor(
    private $http: ng.IHttpService,
    private requestBuilder: RequestBuilder) {}

  /**
   * Retrieve the composite user information.
   *
   * @param id User Id
   * @return Response observable
   */
  public getComposite(id: string): Observable<any>  {
    return this.requestBuilder.getJson('/composite/{id}', { id: id }, null, {})
      .retry(2).cache(1);
  }

  public getCustomerProfile(ban: string): Observable<any> {
    return this.requestBuilder.getJson(
        '/v1/CSL/Accounts/BillingAccounts/CustomerProfiles',
        null,
        {
          BAN: ban
        },
        null,
        'http://ec2-52-32-48-138.us-west-2.compute.amazonaws.com:9992')
      .retry(2)
      .cache(1);
  }

  public getOrderLineItems(ban: string): Observable<any> {
    return this.requestBuilder.getJson(
        '/v1/CSL/Orders/QuoteOrdersLineItems',
        null,
        {
          BAN: ban
        },
        null,
        'http://ec2-52-32-48-138.us-west-2.compute.amazonaws.com:9993')
      .retry(2)
      .cache(1);
  }

  public addOrderLineItem(lineItem: any): Observable<any> {
    return this.requestBuilder.putJson(
        '/v1/CSL/Orders/QuoteOrdersLineItems',
        null,
        null,
        lineItem,
        null,
        'http://ec2-52-32-48-138.us-west-2.compute.amazonaws.com:9993')
      .retry(2)
      .cache(1);
  }

  public removeOrderLineItem(ban: string, id: string): Observable<any> {
    return this.requestBuilder.deleteJson(
        '/v1/CSL/Orders/QuoteOrdersLineItems',
        null,
        {
          BAN: ban,
          lineItemID: id
        },
        null,
        'http://ec2-52-32-48-138.us-west-2.compute.amazonaws.com:9993')
      .retry(2)
      .cache(1);
  }

  /**
   * Subscribes to the Notification service.
   *
   * @param id User Id
   * @return Response observable
   */
  public getNotificationsObservable(id: string): Observable<any>  {
    return this.requestBuilder.sse('/sseNotification', { id: id }, true);
  }

  /**
   * Subscribes to the Notification service.
   *
   * @param id User Id
   * @return Response observable
   */
  public getAccountBalanceObservable(id: string): Observable<any>  {
    return this.requestBuilder.sse('/sseAccount', { id: id }, true);
  }
}
