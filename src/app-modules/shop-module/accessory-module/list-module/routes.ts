/**
 * @module AccessoryList
 */
/** */

/**
 * Accessory List Module Router States
 */
export class AccessoryListRouterStates {
  /**
   * Defines the router states.
   *
   * @param module AngularJS module definition
   */
  public define(module: ng.IModule): void {
    module.config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
      $stateProvider
        .state('accessory', {
          abstract: true,
          template: '<ui-view/>'
        })
        .state('accessory.list', {
          url: '/accessory-list',
          templateUrl: require('!!file!./views/list.page.html')
        });
    }]);
  }
}
