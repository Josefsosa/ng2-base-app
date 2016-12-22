/**
 * @module PDL
 */
 /** */
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { IPdl, IPdlEvent, IPdlPageViewEvent, IPdlObserver } from '../pdl.interfaces';
import { SITE_MAP } from '../pdl.constants';

/**
 * PDL framework provider implementation.
 */
export class PdlProvider implements ng.IServiceProvider {
  /**
   * Observable for PDL track events.
   */
  private eventSubject: Subject<IPdlEvent> = new Subject<IPdlEvent>();

  /**
   * Observable for PDL page view events.
   */
  private pageViewSubject: Subject<IPdlPageViewEvent> = new Subject<IPdlPageViewEvent>();

  /**
   * PDL provider service getter.
   */
  public $get: any[] = ['$window', '$rootScope', PdlProvider.prototype.getService.bind(this)];

  /**
   * Builds the PDL provider service.
   * @param $window AngularJS $window service
   * @param $rootScope AngularJS root scope
   * @returns PDL service instance
   */
  private getService($window: any, $rootScope: ng.IScope): IPdl {
    let self: PdlProvider = this,
      service: any = {
        subscribe(observable: IPdlObserver): Subscription {
          let subscription: Subscription = self.eventSubject.subscribe(observable.trackEvent.bind(observable));
          subscription.add(self.pageViewSubject.subscribe(observable.trackPageView.bind(observable)));
          return subscription;
        },
        getPageViewObservable(): Observable<IPdlPageViewEvent> {
          return self.pageViewSubject;
        },
        getEventObservable(): Observable<IPdlEvent> {
          return self.eventSubject;
        }
      };

    service.init = function init(): void {
      $window.digitalDataFreshCopy = angular.copy($window.digitalData);
    };

    service.trackPageView = function trackPageView(event: IPdlPageViewEvent): void {
      self.pageViewSubject.next(event);
    };

    service.trackEvent = function trackEvent(event: IPdlEvent): void {
      self.eventSubject.next(event);
    };

    service.watch = function(scope: ng.IScope): void {
        let watchedObjs: string[] = [];

        angular.forEach(scope, (value: any, key: string) => {
          if (!key.match(/(\$)+/) && !key.match(/^this$/) && !angular.isFunction(scope[key])) {
            watchedObjs.push(key);
          }
        });

        // watch each all user defined variables
        watchedObjs.forEach((v: string) => {
          scope.$watchCollection(v, function(newVal: any): void {
            service.trackEvent('Watched', v + ' variable : ' + newVal);
          });
        });
    };

    // listen for UI Router
    $rootScope.$on('$stateChangeSuccess', function(event: any, toState: ng.ui.IState,
      toParams: ng.ui.IStateParamsService, fromState: ng.ui.IState): void {
        // capture previous state
        $rootScope['previousState'] = fromState.name;
        // capture next state
        $rootScope['nextState'] = toState.name;

        if (!toState.data) {
          toState.data = {};
        }

        toState.data.page = SITE_MAP.PAGE[toState.name];

        service.trackPageView({
          toState: toState,
          fromState: fromState
        });
    });

    return service;
  }
}
