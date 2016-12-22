import { FooterComponent } from './footer.component';
import { expect } from 'chai';
require('sinon');

describe('FooterComponent Test Suite', () => {
  let footer: FooterComponent;

  beforeEach(() => {
    footer = new FooterComponent();
  });

  it('Test Footer Template', () => {
    expect(footer.template).not.to.be.null;
    expect(footer.template).not.to.be.undefined;
    expect(footer.template).to.be.a('string');
    expect(footer.template).not.to.be.empty;
  });
});