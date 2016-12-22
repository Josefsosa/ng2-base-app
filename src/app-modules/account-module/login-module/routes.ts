/**
 * @module Login
 */
/** */

/**
 * Login module router states
 */
export class LoginRouterStates {
  /**
   * Defines the router states.
   *
   * @param module AngularJS module definition
   */
  public define(module: ng.IModule): void {
    module.config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
      $stateProvider
        .state('login', {
          url: '/',
          templateUrl: require('!!file!./views/login.page.html')
        });
    }]);
  }
}
