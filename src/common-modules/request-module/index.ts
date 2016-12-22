/**
 * @module Request
 * @preferred
 *
 * Request Module
 */
/** */

import { RequestBuilder } from './services/request-builder.service';

/**
 * Request AngularJS Module Declaration
 */
export const requestModule: ng.IModule = angular.module('ref.request', []);
requestModule.service('requestBuilder', <any>RequestBuilder);
