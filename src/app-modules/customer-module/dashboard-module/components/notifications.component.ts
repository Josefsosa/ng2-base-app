/**
 * @module CustomerDashboard
 */
/** */

import { Subscription } from 'rxjs/Rx';
import { CustomerService } from '../../services/customer.service';

/**
 * Customer Notifications Component Declaration
 */
class CustomerNotificationsController {
  private static $inject: string[] = ['customerService', '$scope'];
  public customerId: string;
  public notifications: any[];
  public viewNotifications: any[];
  public loading: boolean;
  private notificationsSubscription: Subscription;

  /**
   * Constructor.
   * @param $http AngularJS $http service.
   */
  public constructor(
    private customerService: CustomerService,
    private scope: ng.IScope) {}

  public $onInit(): void {
    this.loading = true;
    this.notificationsSubscription =
      this.customerService.getNotificationsObservable(this.customerId)
        .subscribe((notification: any) => {
          this.viewNotifications.unshift(notification);
          this.viewNotifications = this.viewNotifications.slice(0, 5);
          this.scope.$apply();
        }, () => {});
  }

  public $onChanges(changesObj: any): void {
    if (changesObj.notifications && angular.isArray(this.notifications)) {
      this.viewNotifications = this.notifications.slice(0, 5);
      this.loading = false;
    }
  }

  public $onDestroy(): void {
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
      this.notificationsSubscription = null;
    }
  }
}


export class CustomerNotificationsComponent implements ng.IComponentOptions {
  public controller: any = CustomerNotificationsController;
  public templateUrl: string = require('!!file!../views/notifications.component.html');
  public bindings: any = {
    notifications: '<',
    customerId: '<'
  };
}
