/**
 * @module CustomerDashboard
 */
/** */

import { CustomerService } from '../../services/customer.service';

/**
 * Customer Info Controller Declaration
 */
export class CustomerInfoController {
  private static $inject: string[] = ['customerService'];
  public customerId: string;
  public profile: any;
  public loading: boolean;
  public noInfo: boolean;

  /**
   * Constructor.
   * @param $scope AngularJS $scope service.
   */
  public constructor(
    private customerService: CustomerService) {}

  public $onInit(): void {
    this.loading = true;
    this.customerService.getCustomerProfile(this.customerId)
      .subscribe((customerProfile) => {
        this.profile = customerProfile;
        this.loading = false;
        this.noInfo = false;
      }, () => {
        this.loading = false;
        this.noInfo = true;
      });
  }
}

/**
 * Customer Info Component Declaration
 */
export class CustomerInfoComponent implements ng.IComponentOptions {
  public controller: any = CustomerInfoController;
  public templateUrl: string = require('!!file!../views/customer-info.component.html');
  public bindings: any = {
    customerId: '<'
  };
}
