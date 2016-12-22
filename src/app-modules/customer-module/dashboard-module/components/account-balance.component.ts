/**
 * @module CustomerDashboard
 */
/** */

import { Subscription } from 'rxjs/Rx';
import { CustomerService } from '../../services/customer.service';

/**
 * Customer Account Balance Component Declaration
 */
class CustomerAccountBalanceController {
  private static $inject: string[] = ['customerService', '$scope'];
  public customerId: string;
  public accountBalance: number = 100;
  private accountBalanceSubscription: Subscription;

  public constructor(
    private customerService: CustomerService,
    private scope: ng.IScope) {}

  public $onInit(): void {
    this.accountBalanceSubscription =
      this.customerService.getAccountBalanceObservable(this.customerId)
        .subscribe((accountInfo: any) => {
          if (accountInfo && accountInfo.balance) {
            this.accountBalance = parseFloat(accountInfo.balance);
            this.scope.$apply();
          }
        }, () => {});
  }

  public $onDestroy(): void {
    if (this.accountBalanceSubscription) {
      this.accountBalanceSubscription.unsubscribe();
      this.accountBalanceSubscription = null;
    }
  }
}

/**
 * Customer Account Balance Component Declaration
 */
export class CustomerAccountBalanceComponent implements ng.IComponentOptions {
  public controller: any = CustomerAccountBalanceController;
  public templateUrl: string = require('!!file!../views/account-balance.component.html');
  public bindings: any = {
    customerId: '<'
  };
}
