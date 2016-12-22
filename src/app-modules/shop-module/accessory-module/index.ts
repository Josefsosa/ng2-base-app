/**
 * @module Accessory
 * @preferred
 *
 * Accessory Module
 */
/** */

import { accessoryListModule } from './list-module';

/**
 * Accessory AngularJS Module Declaration
 */
export const accessoryModule: ng.IModule = angular.module('ref.accessory', [accessoryListModule.name]);
