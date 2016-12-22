/**
 * @module Shop
 * @preferred
 *
 * Shop Module
 */
/** */

import { cartModule } from './cart-module';
import { accessoryModule } from './accessory-module';

/**
 * Shop AngularJS Module Declaration
 */
export const shopModule: ng.IModule = angular.module('ref.shop', [
  cartModule.name,
  accessoryModule.name
]);
