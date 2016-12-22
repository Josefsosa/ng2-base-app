import { LoginComponent, LoginController } from './login.component';
import { expect } from 'chai';
require('sinon');

describe('LoginComponent Test Suite', () => {
  let component: LoginComponent,
    controller: LoginController;

  beforeEach(() => {
    component = new LoginComponent();
    controller = new LoginController();
  });

  it('Test Component Template', () => {
    expect(component.templateUrl).not.to.be.null;
    expect(component.templateUrl).not.to.be.undefined;
    expect(component.templateUrl).to.be.a('string');
    expect(component.templateUrl).not.to.be.empty;
  });

  it('Test Component Controller', () => {
    expect(component.controller).not.to.be.null;
    expect(component.controller).not.to.be.undefined;
    expect(component.controller).to.be.a('function');
  });

  it('Test Controller', () => {
    controller.$onInit();
    controller.login();
  });
});
