import { ExceptionHandlerDecorator } from './exception.decorator';
import { expect } from 'chai';
require('sinon');

describe('Exception Handler Decorator Test Suite', () => {
  let excDecorator: ExceptionHandlerDecorator;

  beforeEach(() => {
    excDecorator = new ExceptionHandlerDecorator();
  });

  it('Test Exception Decorator Template', () => {
    expect(excDecorator.decorate).not.to.be.null;
    expect(excDecorator.decorate).not.to.be.undefined;
    expect(excDecorator.decorate).not.to.be.empty;
  });
});