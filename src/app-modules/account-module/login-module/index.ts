/**
 * @module Login
 * @preferred
 *
 * User Login Module
 */
/** */

import { LoginComponent } from './components/login.component';
import { LoginRouterStates } from './routes';


/**
 * Login AngularJS Module Declaration
 */
export const loginModule: ng.IModule = angular.module('ref.login', []);
loginModule.component('login', new LoginComponent());

/**
 * Define router states for the Login module
 */
let routerStates: LoginRouterStates = new LoginRouterStates();
routerStates.define(loginModule);
