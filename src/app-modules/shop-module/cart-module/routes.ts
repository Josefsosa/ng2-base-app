/**
 * @module Cart
 */
/** */

/**
 * Cart Module Router States
 */
export class CartRouterStates {
  /**
   * Defines the router states.
   *
   * @param module AngularJS module definition
   */
  public define(module: ng.IModule): void {
    module.config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
      $stateProvider
        .state('cart', {
          url: '/cart',
          templateUrl: require('!!file!./views/cart.page.html')
        });
    }]);
  }
}
