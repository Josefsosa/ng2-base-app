/**
 * @module Common
 * @preferred
 *
 * Common Module
 */
 /** */

import { registerDigitalData } from './utils/digital.data.utils';
import { exceptionModule } from './exception-module';
import { requestModule } from './request-module';
import { pdlModule } from './pdl-module';
import { CommonUtils } from './utils/common.utils';

/**
 * Register Digital Data Object
 */
registerDigitalData(window);

/**
 * Common Modules AngularJS Module Declaration
 */
export const commonModule: ng.IModule = angular.module('ref.common', [
  exceptionModule.name,
  requestModule.name,
  pdlModule.name
]);
commonModule.service('commonUtils', CommonUtils);
