/**
 * @module Header
 * @preferred
 *
 * Header Module
 */
/** */

import { HeaderComponent } from './components/header.component';

/**
 * Header AngularJS Module Declaration
 */
export const headerModule: ng.IModule = angular.module('ref.header', []);
headerModule.component('header', new HeaderComponent());
