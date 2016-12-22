/**
 * @module Login
 */
/** */

/**
 * Login Controller Declaration
 */
export class LoginController {

/**
 * Initializes the states of the component
 */
  public $onInit(): void {
  }

/**
 * Logins the current user
 */
  public login(): void {
  }
}

/**
 * Login Component Declaration
 */
export class LoginComponent implements ng.IComponentOptions {
  public controller: any = LoginController;
  public templateUrl: any = require('!!file!../views/login.component.html');
}
