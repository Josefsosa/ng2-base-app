import { CartComponent } from './cart.component';
import { expect } from 'chai';
require('sinon');

describe('CartComponent Test Suite', () => {
  let cart: CartComponent;

  beforeEach(() => {
    cart = new CartComponent();
  });

  it('Test Accesory List Component Template', () => {
    expect(cart.templateUrl).not.to.be.null;
    expect(cart.templateUrl).not.to.be.undefined;
    expect(cart.templateUrl).to.be.a('string');
    expect(cart.templateUrl).not.to.be.empty;
  });
});