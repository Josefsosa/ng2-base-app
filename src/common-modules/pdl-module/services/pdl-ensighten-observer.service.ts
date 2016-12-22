/**
 * @module PDL
 */
 /** */
import { IPdlObserver, IPdlPageViewEvent, IPdlEvent } from '../pdl.interfaces';
import { PdlPageUtil } from '../utils/pdl.page.utils';
import { SESSION_CONST } from '../../common.constants';
import { APP_CONSTANT } from '../../app.constants';
import { PDL_CONSTANT, PDL_CALLBACK_EVENT } from '../pdl.constants';

/**
 * Stub implementaion of digitalData. Used when not available.
 */
const BASE_DIGITAL_DATA: any = {
  page: {},
  events: [{}],
  triggerEvent: () => {}
};

/**
 * PDL Ensighten observer implementation.
 */
export class PdlEnsightenObserver implements IPdlObserver {
  /**
   * AngularJS dependencies
   */
  private static $inject: string[] = ['$window', 'pdlPageUtil'];

  /**
   * If console output is enabled or not.
   */
  private consoleOutput: boolean = false;

  /**
   * Local copy of digitalData object.
   */
  private digitalData: any;

  /**
   * Constructor.
   * @param $window AngularJS $window service.
   * @param pdlPageUtil PDL Page Utilities instance.
   */
  public constructor(
    private $window: any,
    private pdlPageUtil: PdlPageUtil) {
      this.$window.digitalDataFreshCopy = $window.digitalData || angular.copy(BASE_DIGITAL_DATA);
    }

  /**
   * Resets digitalData object.
   */
  private reset(): void {
    this.$window.digitalData = angular.copy(this.$window.digitalDataFreshCopy);
    this.digitalData = this.$window.digitalData;
  }

  /**
   * Enables or disables console output on the tracked events.
   * @param enabled If console output will be enabled or not.
   */
  public setConsoleOutput(enabled: boolean): void {
    this.consoleOutput = enabled;
  }

  /**
   * Tracks page details on state change
   * @param event PDL Page View Event
   */
  public trackPageView(event: IPdlPageViewEvent): void {
    let toState: ng.ui.IState = event.toState,
      pageInfoObj: any,
      matches: string[],
      domain: string;

    // reset PDL
    this.reset();
    pageInfoObj = this.digitalData.page;

    if (angular.isDefined(toState.data.page)) {
      this.pdlPageUtil.setCurrentPageURL(toState, pageInfoObj);
      this.pdlPageUtil.setPreviousPageURL(pageInfoObj);
      matches = pageInfoObj.pageURL.match(APP_CONSTANT.DOMAIN_REGEXP);
      domain = matches && matches[1];
      pageInfoObj.server = domain;
      pageInfoObj.pageTitle = toState.data.page.pageTitle;
      pageInfoObj.siteSection = toState.data.page.siteSection;
      pageInfoObj.siteSubSection = toState.data.page.siteSubSection;
      pageInfoObj.pageName = toState.data.page.pageName;
      localStorage.setItem(SESSION_CONST.PREVIOUS_PAGE_URL, pageInfoObj.pageURL);
      localStorage.setItem(SESSION_CONST.PREVIOUS_PAGE_NAME, pageInfoObj.pageName);
      this.digitalData.page = pageInfoObj;

      if (this.consoleOutput) {
        console.log('PAGE EVENT TRACKED -->', this.digitalData);
      }
    }
  }

  /**
   * Tracks PDL event
   * @param event PDL Event
   */
  public trackEvent(event: IPdlEvent): void {
    let digitialEventObj: any = {},
      domEvent: any = event.event,
      eventName: string;

    if (this.hasAttribute(domEvent, PDL_CONSTANT.HEADER_ATTRIBUTE)) {
      eventName = this.findAttribute(domEvent, PDL_CONSTANT.HEADER_ATTRIBUTE);
      digitialEventObj = this.trackEventObject(domEvent, eventName, PDL_CONSTANT.HEADER);

    } else if (this.hasAttribute(domEvent, PDL_CONSTANT.FOOTER_ATTRIBUTE)) {
      eventName = this.findAttribute(domEvent, PDL_CONSTANT.HEADER_ATTRIBUTE);
      digitialEventObj = this.trackEventObject(domEvent, eventName, PDL_CONSTANT.FOOTER);
    }

    if (this.consoleOutput) {
      console.log('NG EVENT TRACKED -->', digitialEventObj);
    }

    this.digitalData.triggerEvent(PDL_CALLBACK_EVENT[digitialEventObj.eventName]);
  }

  private trackEventObject(event: any, eventName: string, navType: string): any {
    let eventDate: Date = new Date(),
      eventObj: any = this.digitalData.events[0];
    eventObj.eventAction = event.type;
    eventObj.pageName = this.digitalData.page.pageName;
    eventObj.pageUrl = this.digitalData.page.pageURL;
    eventObj.timeStamp = eventDate.toISOString();
    eventObj.eventName = eventName;
    eventObj.navType = navType;
    return eventObj;
  }

  private hasAttribute(event: any, attribute: string): boolean {
    return this.pdlPageUtil.hasAttributeInParentNode(event, attribute);
  }

  private findAttribute(event: any, attribute: string): string {
    return this.pdlPageUtil.findAttributeInParentNode(event, attribute);
  }
}
