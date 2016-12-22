/**
 * @module Cart
 * @preferred
 *
 * Shopping Cart Module
 */
/** */

import { CartComponent } from './components/cart.component';
import { CartRouterStates } from './routes';


/**
 * Shopping Cart AngularJS Module Declaration
 */
export const cartModule: ng.IModule = angular.module('ref.cart', []);
cartModule.component('cart', new CartComponent());

/**
 * Define router states for the Accessory List module
 */
let routerStates: CartRouterStates = new CartRouterStates();
routerStates.define(cartModule);
