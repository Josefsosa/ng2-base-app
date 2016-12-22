/**
 * @module Exception
 */
/** */

import { Observable, Subject } from 'rxjs/Rx';
import { logger } from '../../log-module/services/logger.service';
import { IException } from '../exception.interfaces';

export class ExceptionHandler {
  /**
   * Stream to track all ocurred errors and be externally subrcribed
   */
  private exceptionSubject: Subject<IException> = new Subject<IException>();

  /**
   * Get the Exception Subject
   * @returns this.exceptionSubject The errors stream
   */
  public getObservable(): Observable<IException> {
    return this.exceptionSubject;
  }

  /**
   * Prevents errors to be logged twice
   * Formats error message
   * Sends error to the logger
   * Pushes a new error to the Exception Subject
   * @param error Error Object
   * @param context Context where the error ocurred
   */
  public handle(error: any, context?: string): void {
    let message: string;

    if (error && !error.stopPropagation) {
      error.stopPropagation = true; // prevent it from been logged twice
      message = error.toString();

      if (error.stack) {
        if (error.stack.startsWith(message)) {
          message += error.stack.substring(message.length);
        } else {
          message += '\n' + error.stack;
        }
      }

      logger.error(message, context);

      this.exceptionSubject.next({
        error: error,
        context: context,
        message: message
      });
    }
  }
}

export let exceptionHandler: ExceptionHandler = new ExceptionHandler();
