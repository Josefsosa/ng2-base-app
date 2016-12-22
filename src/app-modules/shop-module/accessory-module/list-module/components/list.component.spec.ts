import { AccessoryListComponent } from './list.component';
import { expect } from 'chai';
require('sinon');

describe('AccessoryListComponent Test Suite', () => {
  let accesoryList: AccessoryListComponent;

  beforeEach(() => {
    accesoryList = new AccessoryListComponent();
  });

  it('Test Accesory List Component Template', () => {
    expect(accesoryList.templateUrl).not.to.be.null;
    expect(accesoryList.templateUrl).not.to.be.undefined;
    expect(accesoryList.templateUrl).to.be.a('string');
    expect(accesoryList.templateUrl).not.to.be.empty;
  });
});