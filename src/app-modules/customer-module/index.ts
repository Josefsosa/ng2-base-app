/**
 * @module Customer
 * @preferred
 *
 * Customer Module
 */
/** */

import { customerDashboardModule } from './dashboard-module';
import { CustomerService } from './services/customer.service';

/**
 * Customer AngularJS Module Declaration
 */
export const customerModule: ng.IModule = angular.module('ref.customer', [customerDashboardModule.name]);
customerModule.service('customerService', <any>CustomerService);
