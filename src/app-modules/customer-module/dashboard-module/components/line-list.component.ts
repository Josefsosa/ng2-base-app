/**
 * @module CustomerDashboard
 */
/** */

import * as _ from 'lodash';
import { CustomerService } from '../../services/customer.service';

/**
 * Customer Line List Controller Declaration
 */
export class CustomerLineListController {
  private static $inject: string[] = ['customerService'];
  public customerId: string;
  public lines: any[];
  public loading: boolean;

  public phones: any[] = [
    {
      Make: 'Apple',
      Model: 'iPhone 6s',
      UnitPrice: 649.99
    },
    {
      Make: 'Apple',
      Model: 'iPhone 6s Plus',
      UnitPrice: 749.99
    },
    {
      Make: 'Samsung',
      Model: 'Galaxy Note7',
      UnitPrice: 849.99
    },
    {
      Make: 'Samsung',
      Model: 'Galaxy J7',
      UnitPrice: 239.99
    },
    {
      Make: 'Samsung',
      Model: 'Galaxy On5',
      UnitPrice: 139.99
    },
    {
      Make: 'LG',
      Model: 'K10',
      UnitPrice: 164.99
    }
  ];

  /**
   * Constructor.
   * @param $scope AngularJS $scope service.
   */
  public constructor(
    private customerService: CustomerService) {}

  public $onInit(): void {
    this.loading = true;
    this.refreshLines();
  }

  public refreshLines(): void {
    this.customerService.getOrderLineItems(this.customerId)
      .subscribe((data: any) => {
        this.lines = <any[]>_.get(data, 'items') || [];
        this.loading = false;
      }, () => {
        this.lines = [];
        this.loading = false;
      });
  }

  public addLine(): void {
    let phone: any = angular.extend(
      {
        BAN: this.customerId,
        LineItemID: _.random(10000, 99999) + '',
        Quantity: _.random(1, 5),
        SKU: '12345',
        Variant: ''
      }, this.phones[_.random(0, this.phones.length - 1)]);

    this.customerService.addOrderLineItem(phone)
      .subscribe(() => {
        this.refreshLines();
      }, () => {
        alert('Error adding line...');
      });
  }
}

/**
 * Customer Line List Component Declaration
 */
export class CustomerLineListComponent implements ng.IComponentOptions {
  public controller: any = CustomerLineListController;
  public templateUrl: string = require('!!file!../views/line-list.component.html');
  public bindings: any = {
    customerId: '<'
  };
}
