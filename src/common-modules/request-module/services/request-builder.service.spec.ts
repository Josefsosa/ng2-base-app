import { RequestBuilder } from './request-builder.service';
import { expect } from 'chai';
require('sinon');

describe('Request Builder test suite', () => {
  let reqBuilder: RequestBuilder,
    exceptionHandler: any,
    $http: any,
    observable: any,
    pathParams: any,
    queryParams: any,
    body: any,
    reponseType: any,
    additionalHeaders: any;

  beforeEach(() => {
    reqBuilder = new RequestBuilder($http, exceptionHandler);
  });

  it('Test Exception Decorator Constructor', () => {
    expect(reqBuilder).not.to.be.null;
    expect(reqBuilder).not.to.be.undefined;
    expect(reqBuilder).not.to.be.empty;
  });

  it('Test Build Request', () => {
    observable = reqBuilder.build('', '', '', pathParams, queryParams, body, reponseType, additionalHeaders);

    expect(observable).not.to.be.null;
    expect(observable).not.to.be.undefined;
    expect(observable).not.to.be.empty;
  });

  it('Test json method', () => {
    observable = reqBuilder.json('', '', pathParams, queryParams, body, reponseType, additionalHeaders);

    expect(observable).not.to.be.null;
    expect(observable).not.to.be.undefined;
    expect(observable).not.to.be.empty;
  });

  it('Test getJson method', () => {
    observable = reqBuilder.getJson('', '', pathParams, queryParams, additionalHeaders);

    expect(observable).not.to.be.null;
    expect(observable).not.to.be.undefined;
    expect(observable).not.to.be.empty;
  });

  it('Test postJson method', () => {
    observable = reqBuilder.postJson('', '', pathParams, queryParams, body, additionalHeaders);

    expect(observable).not.to.be.null;
    expect(observable).not.to.be.undefined;
    expect(observable).not.to.be.empty;
  });

  it('Test putJson method', () => {
    observable = reqBuilder.putJson('', '', pathParams, queryParams, body, additionalHeaders);

    expect(observable).not.to.be.null;
    expect(observable).not.to.be.undefined;
    expect(observable).not.to.be.empty;
  });

  it('Test sse method', () => {
    observable = reqBuilder.sse('', '', pathParams);

    expect(observable).not.to.be.null;
    expect(observable).not.to.be.undefined;
    expect(observable).not.to.be.empty;
  });

  it('Test websocket method', () => {
    observable = reqBuilder.websocket('', pathParams);

    expect(observable).not.to.be.null;
    expect(observable).not.to.be.undefined;
    expect(observable).not.to.be.empty;
  });
});