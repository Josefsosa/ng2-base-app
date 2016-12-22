/**
 * @module CustomerDashboard
 */
/** */

/**
 * Customer Dashboard Module Router States
 */
export class CustomerDashboardRouterStates {
  /**
   * Defines the router states.
   *
   * @param module AngularJS module definition
   */
  public define(module: ng.IModule): void {
    module.config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
      $stateProvider
        .state('customer', {
          abstract: true,
          template: '<ui-view/>'
        })
        .state('customer.landing', {
          url: '/customer-landing',
          templateUrl: require('!!file!./views/landing.page.html')
        });
    }]);
  }
}
