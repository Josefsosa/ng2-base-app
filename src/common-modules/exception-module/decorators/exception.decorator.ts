/**
 * @module Exception
 */
/** */

import { exceptionHandler } from '../services/exception-handler.service';

/**
 * Decorates the $exceptionHandler AngularJS Service
 */
export class ExceptionHandlerDecorator {
  public decorate($provide: ng.auto.IProvideService): void {
    $provide.decorator('$exceptionHandler', ['$delegate', ($delegate: any): any => {
      return (exception, cause) => {
        exceptionHandler.handle(exception);
      };
    }]);
  }
}
