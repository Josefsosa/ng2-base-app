/**
 * @module CustomerDashboard
 * @preferred
 *
 * Customer Dashboard Module
 */
/** */

import { CustomerNotificationsComponent } from './components/notifications.component';
import { CustomerLineListComponent } from './components/line-list.component';
import { CustomerLineDetailComponent } from './components/line-detail.component';
import { CustomerAccountBalanceComponent } from './components/account-balance.component';
import { CustomerInfoComponent } from './components/customer-info.component';
import { CustomerDashboardComponent } from './components/dashboard.component';
import { CustomerDashboardRouterStates } from './routes';

/**
 * Customer Dashboard AngularJS Module Declaration
 */
export const customerDashboardModule: ng.IModule = angular.module('ref.customerLanding', []);
customerDashboardModule.component('customerDashboard', new CustomerDashboardComponent());
customerDashboardModule.component('customerInfo', new CustomerInfoComponent());
customerDashboardModule.component('customerAccountBalance', new CustomerAccountBalanceComponent());
customerDashboardModule.component('customerLineList', new CustomerLineListComponent());
customerDashboardModule.component('customerLineDetail', new CustomerLineDetailComponent());
customerDashboardModule.component('customerNotifications', new CustomerNotificationsComponent());


/**
 * Define router states for the Customer Landing module
 */
let routerStates: CustomerDashboardRouterStates = new CustomerDashboardRouterStates();
routerStates.define(customerDashboardModule);
