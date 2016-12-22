import { IPdl, IPdlObserver, IPdlEvent, IPdlPageViewEvent } from '../pdl.interfaces';
import { PdlProvider } from './pdl.provider';
import { expect } from 'chai';
require('sinon');

class UnitTestPdlObsever implements IPdlObserver {
  private eventCallback: (event: IPdlEvent) => void;
  private pageViewCallback: (event: IPdlPageViewEvent) => void;

  setEventCallback(eventCallback: (event: IPdlEvent) => void) {
    this.eventCallback = eventCallback;
  }

  setPageViewCallback(pageViewCallback: (event: IPdlPageViewEvent) => void) {
    this.pageViewCallback = pageViewCallback;
  }

  trackPageView(event: IPdlPageViewEvent): void {
    if (this.pageViewCallback) {
      this.pageViewCallback(event);
    }
  }

  trackEvent(event: IPdlEvent): void {
    if (this.eventCallback) {
      this.eventCallback(event);
    }
  }
}

describe('PDL Provider Test Suite', () => {
  let provider: PdlProvider,
    observer: UnitTestPdlObsever,
    $window: any,
    $windowAddEventListener: Sinon.SinonStub,
    $rootScope: any,
    $rootScope$On: Sinon.SinonStub;

  beforeEach(() => {
    provider = new PdlProvider();
    observer = new UnitTestPdlObsever();

    $window = {
      digitalData: {},
      addEventListener: () => {}
    };
    $windowAddEventListener = sinon.stub($window, 'addEventListener');

    $rootScope = {
      $on: () => {}
    };
    $rootScope$On = sinon.stub($rootScope, '$on');
  });

  it('Test window digitalDataReady event', () => {
    let service: IPdl,
      trackEventSpy: Sinon.SinonSpy = sinon.spy(),
      addEventListenerCallback: any;

    $windowAddEventListener.withArgs('digitalDataReady');
    observer.setEventCallback(trackEventSpy);

    service = provider.$get[2]($window, $rootScope);
    service.subscribe(observer);

    // get the registered event callback
    expect($windowAddEventListener.callCount).to.be.equals(1);
    addEventListenerCallback = $windowAddEventListener.firstCall.args[1];

    // execute the callback with no detail
    addEventListenerCallback({});

    // no calls yet
    expect(trackEventSpy.callCount).to.be.equals(0);

    // execute the callback with detail
    addEventListenerCallback({
      detail: 'unit test'
    });

    // the previous event must have been tracked
    expect(trackEventSpy.callCount).to.be.equals(1);
  });

  it('Test UI Router listener', () => {
    let service: IPdl,
      trackPageViewEvent: Sinon.SinonSpy = sinon.spy(),
      routeChangeCallback: any;

    $rootScope$On.withArgs('$stateChangeSuccess');

    service = provider.$get[2]($window, $rootScope);
    service.subscribe(observer);

    // get the registered event callback
    expect($rootScope$On.callCount).to.be.equals(1);
    routeChangeCallback = $rootScope$On.firstCall.args[1];
  });

});
