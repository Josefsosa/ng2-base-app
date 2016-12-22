import { registerDigitalData } from './digital.data.utils';
import { expect } from 'chai';
require('sinon');

describe('Digital Data Utils Test Suite', () => {
  let $window: any;

  beforeEach(() => {
    $window = {
      digitalData: {}
    };
  });

  describe('registerDigitalData', () => {
    let fakeDigitalData: Sinon.SinonStub = sinon.stub($window, 'digitalData');

    registerDigitalData($window);

    it('Validate Digital Data exists', () => {
      console.log(fakeDigitalData);
      expect(fakeDigitalData).to.be.equal('');
    });
  });

});
