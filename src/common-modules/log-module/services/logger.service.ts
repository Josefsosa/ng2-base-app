/**
 * @module Log
 */
/** */
export class Logger {
  /**
   * Validates console features support
   */
  private console: any = console;
  private supportsDebug: boolean = !!this.console.info;
  private supportsInfo: boolean = !!this.console.info;
  private supportsWarn: boolean = !!this.console.warn;
  private supportsError: boolean = !!this.console.error;

  /**
   * Builds the error message
   */
  private build(message: string, context?: string): string {
    let line: string = message;

    if (context && context.length > 0) {
      line = '[' + context + '] ' + message;
    }

    return line;
  }

  /**
   * Logs a single message
   */
  public log(message: string, context?: string): void {
    if (message) {
      this.console.log(this.build(message, context));
    }
  }

  /**
   * Logs a single message
   */
  public debug(message: string, context?: string): void {
    if (message) {
      if (this.supportsDebug) {
        this.console.debug(this.build(message, context));
      } else {
        this.log(message, context);
      }
    }
  }

  /**
   * Logs an informative message
   */
  public info(message: string, context?: string): void {
    if (message) {
      if (this.supportsInfo) {
        this.console.info(this.build(message, context));
      } else {
        this.log(message, context);
      }
    }
  }

  /**
   * Logs a warning message
   */
  public warn(message: string, context?: string): void {
    if (message) {
      if (this.supportsWarn) {
        this.console.warn(this.build(message, context));
      } else {
        this.log(message, context);
      }
    }
  }

  /**
   * Logs an error message
   */
  public error(message: string, context?: string): void {
    if (message) {
      if (this.supportsError) {
        this.console.error(this.build(message, context));
      } else {
        this.log(message, context);
      }
    }
  }
}

export let logger: Logger = new Logger();