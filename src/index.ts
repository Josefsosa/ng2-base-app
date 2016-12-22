/**
 * @module RefApp
 * @preferred
 *
 * Angular 1.5 CSL Reference Application using TypeScript
 */
 /** */

/// <reference path="vendor/zone.js/zone.js.d.ts"/>
/// <reference path="vendor/eventSource/index.d.ts"/>

import 'zone.js/dist/zone';
import 'angular';
import 'angular-ui-router';
import { commonModule }   from './common-modules';
import { headerModule }   from './common-modules/header-module';
import { footerModule }   from './common-modules/footer-module';
import { customerModule } from './app-modules/customer-module';
import { accountModule }  from './app-modules/account-module';
import { shopModule }     from './app-modules/shop-module';
import { exceptionHandler } from './common-modules/exception-module/services/exception-handler.service';

/**
 * RefApp AngularJS Module Declaration
 */
let app: ng.IModule = angular.module('refApp', [
  'ui.router',
  commonModule.name,
  headerModule.name,
  footerModule.name,
  customerModule.name,
  accountModule.name,
  shopModule.name
]);

/**
 * Enables the HTML5 Mode to the Router Configuration and set the default path
 */
app.config(['$locationProvider', '$urlRouterProvider',
  ($locationProvider: ng.ILocationProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $urlRouterProvider.otherwise('/');
}]);

/**
 * Wraps the global execution context between a Zone.js zone for error handling
 */
Zone.current.fork({
  name: 'root',
  onHandleError: (parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, error: any): boolean => {
    exceptionHandler.handle(error);
    return false;
  }
})

/**
 * Bootstraps the Angular app inside a Zone.js zone
 */
.run(() => {
  angular.bootstrap(document, ['refApp'], {});

  angular.element(document).ready(() => {
    let $state: any = angular.element(document.body).injector().get('$state');
    window['objStatesGenerator'] = $state.get();
  });
});
