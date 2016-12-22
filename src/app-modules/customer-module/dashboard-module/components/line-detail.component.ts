/**
 * @module CustomerDashboard
 */
/** */

import { CustomerService } from '../../services/customer.service';

/**
 * Customer Line Detail Controller Declaration
 */
export class CustomerLineDetailController {
  private static $inject: string[] = ['customerService'];
  public customerId: string;
  public line: any;
  public onDelete: Function;

  /**
   * Constructor.
   * @param $scope AngularJS $scope service.
   */
  public constructor(
    private customerService: CustomerService) {}

  public removeLineItem(): void {
    this.customerService.removeOrderLineItem(this.customerId, this.line.key.itemId)
      .subscribe(() => {
        this.onDelete();
      });
  }
}

/**
 * Customer Line Detail Component Declaration
 */
export class CustomerLineDetailComponent implements ng.IComponentOptions {
   public controller: any = CustomerLineDetailController;
  public templateUrl: string = require('!!file!../views/line-detail.component.html');
  public bindings: any = {
    customerId: '<',
    line: '<',
    onDelete: '&'
  };
}
