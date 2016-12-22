/**
 * @module AccessoryList
 * @preferred
 *
 * Accessory List Module
 */
/** */

import { AccessoryListComponent } from './components/list.component';
import { AccessoryListRouterStates } from './routes';

/**
 * Accessory List AngularJS Module Declaration
 */
export const accessoryListModule: ng.IModule = angular.module('ref.acessory-list', []);
accessoryListModule.component('accessoryList', new AccessoryListComponent());

/**
 * Define router states for the Accessory List module
 */
let routerStates: AccessoryListRouterStates = new AccessoryListRouterStates();
routerStates.define(accessoryListModule);
