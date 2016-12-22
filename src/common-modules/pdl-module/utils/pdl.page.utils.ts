/**
 * @module PDL
 */
 /** */
import { CommonUtils } from '../../utils/common.utils';
import { SESSION_CONST } from '../../common.constants';

/**
 * PDL Page Utilities
 */
export class PdlPageUtil {
  /**
   * AngularJS dependency injection.
   */
  private static $inject: string[] = ['$window', '$location', 'commonUtils'];

  /**
   * constructor.
   * @param $window AngularJS $window service.
   * @param $location AngularJS $location service.
   * @param commonUtils Common Utitiities instance.
   */
  public constructor(
    private $window: any,
    private $location: ng.ILocationService,
    private commonUtils: CommonUtils) {}

  /**
   * Sets the current page URL.
   * @param toState UI Router state.
   * @param page Page information object.
   */
  public setCurrentPageURL(toState: ng.ui.IState, page: any): void {
    let locationUrl: string = this.$location.url(),
      revAbsURL: string,
      revStateURL: string,
      revURL: string;

      // if not the landing page
      if (locationUrl !== toState.url) {
        // while opening any page from the home page
        if (locationUrl === '/') {
          // reversing the URL as we need to remove the '/' from the end of absolute URL,
          // after replacing the URL again reversing it to original form
          revAbsURL = this.$location.absUrl().split('').reverse().join('');
          revStateURL = (<string>toState.url).split('').reverse().join('');
          revURL = locationUrl.split('').reverse().join('');
          revAbsURL = revAbsURL.replace(revURL, revStateURL);
          page.pageURL = revAbsURL.split('').reverse().join('');
        } else {
          page.pageURL = this.$location.absUrl().replace(locationUrl, <string>toState.url);
        }
      } else {
        page.pageURL = this.$location.absUrl();
      }
  }

  /**
   * Determine if an event object node, or any of its parents, have an attribute.
   * @param event Browser event object.
   * @param attribute Attribute to look for.
   * @returns True if the attirbute is in the current node or any parent node.
   */
  public hasAttributeInParentNode(event: any, attribute: string): boolean {
    let node: any = event.currentTarget;
    while (this.commonUtils.isNullable(node)) {
      if (this.commonUtils.isNullable(node.attributes) && this.commonUtils.isNullable(node.attributes[attribute])) {
          return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  /**
   * Returns the value of an attribute in the current node or any of its parents.
   * @param event Browser event object.
   * @param attribute Attribute to look for.
   * @returns Attribute value if found, null otherwise.
   */
  public findAttributeInParentNode(event: any, attribute: string): string {
    let node: any = event.currentTarget;
    while (this.commonUtils.isNullable(node)) {
      if (this.commonUtils.isNullable(node.attributes) && this.commonUtils.isNullable(node.attributes[attribute])) {
          return node.attributes[attribute];
      }
      node = node.parentNode;
    }
    return null;
  }

  /**
   * Updates a page information object with the previous viewed page from local storage.
   * @param page Page information object.
   */
  public setPreviousPageURL(page: any): void {
    page.previousPageURL = localStorage.getItem(SESSION_CONST.PREVIOUS_PAGE_URL);
    page.prevPageName = localStorage.getItem(SESSION_CONST.PREVIOUS_PAGE_NAME);
  }
}
