import { ExceptionHandler } from './exception-handler.service';
import { expect } from 'chai';
require('sinon');

describe('Exception Handler Service test suite', () => {
  let exceptionHandler: ExceptionHandler,
    exception: any;

  beforeEach(() => {
    exceptionHandler = new ExceptionHandler();
    exception = exceptionHandler.getObservable();
  });

  it('Test Get Exception', () => {
    expect(exception).not.to.be.null;
    expect(exception).not.to.be.undefined;
    expect(exception).not.to.be.empty;
  });
});