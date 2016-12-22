/**
 * @module Exception
 * @preferred
 *
 * Exception Module
 */
/** */

import { ExceptionHandlerDecorator } from './decorators/exception.decorator';
import { exceptionHandler } from './services/exception-handler.service';

/**
 * Exception AngularJS Module Declaration
 */
export const exceptionModule: ng.IModule = angular.module('ref.exception', []);
exceptionModule.factory('exceptionHandler', () => exceptionHandler);

/**
 * Provide the exceptionHandlerDecorator as a new Service.
 */
exceptionModule.config(['$provide', ($provide: ng.auto.IProvideService) => {
  let exceptionHandlerDecorator: ExceptionHandlerDecorator = new ExceptionHandlerDecorator();
  exceptionHandlerDecorator.decorate($provide);
}]);
