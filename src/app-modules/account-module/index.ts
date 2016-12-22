/**
 * @module Account
 * @preferred
 *
 * User Account Module
 */
/** */

import { loginModule } from './login-module';

/**
 * Account AngularJS Module Declaration
 */
export const accountModule: ng.IModule = angular.module('ref.account', [loginModule.name]);
