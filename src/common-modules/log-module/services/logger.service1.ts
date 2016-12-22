/* To be used in Spring 76 */

export enum LogLevel {
  TRACE = 0,
  DEBUG,
  INFO,
  WARN,
  ERR
};

export interface ILogger {
  log(message: string, level: LogLevel, context?: any): void;
  trace(message: string, context?: any): void;
  debug(message: string, context?: any): void;
  info(message: string, context?: any): void;
  warn(message: string, context?: any): void;
  error(message: string, context?: any): void;
};

export interface ILogMessage {
  timestamp: number;
  message: string;
  level: LogLevel;
  decorations: any;
  context?: any;
};

export interface ILogHandler {
  log(message: ILogMessage): void;
};

export interface ILogDecorator {
  decorate(message: ILogMessage): ILogMessage;
}


/* Example Code Below */

class LogProvider {
  public addHandler(level: LogLevel, handler: ILogHandler): void {}
  public addConfigurableHandler(param: string, level: LogLevel, handler: ILogHandler): void {}
  public addDecorator(decorator: ILogDecorator): void {}
}

class ConsoleHandler implements ILogHandler {
  public log(message: ILogMessage): void {}
}

class PublishHandler implements ILogHandler {
  public log(message: ILogMessage): void {}
  public setServiceUrl(url: string) {}
  public setMaxWaitTime(wait: number) {}
  public setMaxQueueSize(size: number) {}
}

class TracingContextDecorator implements ILogDecorator {
  public decorate(message: ILogMessage): ILogMessage {
    return message;
  }
}

export class ExampleLoggerUsageController {
  private static $inject: string[] = ['logger'];

  public constructor(private logger: ILogger) {}

  public $onInit(): void {
    this.logger.info('Example Controller Initialized');
  }
}

export const logModule: ng.IModule = angular.module('ref.log', []);

logModule.run(['logProvider',
  (logProvider: LogProvider) => {
    let consoleHandler = new ConsoleHandler(),
      publishHandler = new PublishHandler();

    logProvider.addConfigurableHandler('console', LogLevel.INFO, consoleHandler);
    // configurable by query string parameter
    // ?debug-logger-console=TRACE

    publishHandler.setServiceUrl('/logging/record');
    publishHandler.setMaxQueueSize(20);
    publishHandler.setMaxWaitTime(30000);
    logProvider.addHandler(LogLevel.WARN, publishHandler);
  }
]);

logModule.run(['logProvider',
  (logProvider: LogProvider) => {
    let traceContext = new TracingContextDecorator();
    logProvider.addDecorator(traceContext);
  }
]);
