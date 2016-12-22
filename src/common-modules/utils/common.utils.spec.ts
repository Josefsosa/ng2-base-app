import { CommonUtils } from './common.utils';
import { expect } from 'chai';

describe('Common Utils Test Suite', () => {
  let utils: CommonUtils;

  beforeEach(() => {
    utils = new CommonUtils();
  });

  describe('isNullable', () => {
    it('Null Object', () => {
      expect(utils.isNullable(null)).to.be.equal(false);
    });
  });

});
