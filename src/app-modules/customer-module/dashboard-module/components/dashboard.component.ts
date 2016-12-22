/**
 * @module CustomerDashboard
 */
/** */

import * as _ from 'lodash';
import { CustomerService } from '../../services/customer.service';

/**
 * Customer Dashboard Controller Declaration
 */
export class CustomerDashboardController {
  private static $inject: string[] = ['customerService'];
  public customerId: string = '1111';
  public customer: any;

  /**
   * Constructor.
   * @param $http AngularJS $http service.
   */
  public constructor(
    private customerService: CustomerService) {}

  /**
   * Fetches content from service on init, and makes content available to the view
   */
  public $onInit(): void {
    this.customerService.getComposite(this.customerId)
      .subscribe((data: any) => {
        let customerInfo: any = _.get(data, 'customerInfo.customer'),
          person: any = _.get(customerInfo, 'party.person');

        this.customer = {
          info: {
            id: this.customerId,
            type: _.get(customerInfo, 'customerType'),
            group: _.get(customerInfo, 'customerGroup'),
            name: _.get(person, 'personName.firstName'),
            lastName: _.get(person, 'personName.familyName[0]'),
            phone: _.get(person, 'phoneCommunication[0].phoneNumber'),
            email: _.get(person, 'emailCommunication[0].emailAddress')
          },
          notifications: _.get(data, 'notifications.notifications'),
          lines: _.get(data, 'lines.lines')
        };
      }, () => {
        this.customer = {
          info: {},
          notifications: [],
          lines: []
        };
      });
  }

}

/**
 * Customer Dashboard Component Declaration
 */
export class CustomerDashboardComponent implements ng.IComponentOptions {
  public controller: any = CustomerDashboardController;
  public templateUrl: string = require('!!file!../views/dashboard.component.html');
}
