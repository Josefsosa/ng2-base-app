/**
 * @module Footer
 * @preferred
 *
 * Footer Module
 */
/** */

import { FooterComponent } from './components/footer.component';

/**
 * Footer AngularJS Module Declaration
 */
export const footerModule: ng.IModule = angular.module('ref.footer', []);
footerModule.component('footer', new FooterComponent());
