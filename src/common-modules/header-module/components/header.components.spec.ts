import { HeaderComponent } from './header.component';
import { expect } from 'chai';
require('sinon');

describe('HeaderComponent Test Suite', () => {
  let header: HeaderComponent;

  beforeEach(() => {
    header = new HeaderComponent();
  });

  it('Test Header Template', () => {
    expect(header.template).not.to.be.null;
    expect(header.template).not.to.be.undefined;
    expect(header.template).to.be.a('string');
    expect(header.template).not.to.be.empty;
  });
});