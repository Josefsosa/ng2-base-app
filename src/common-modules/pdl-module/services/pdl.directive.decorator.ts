/**
 * @module PDL
 */
 /** */
import { IPdl } from '../pdl.interfaces';
import { Observable, Subscription } from 'rxjs/Rx';

/**
 * AngularJS directive decorator for PDL events.
 */
export class PdlDirectiveDecorator {

  /**
   * Decorates AngularJS directives to trigger PDL events.
   * @param $provide AngularJS provide service
   */
  public decorate($provide: ng.auto.IProvideService): void {
    // list of directive names
    let directives: string[] = ['ngClick', 'ngDblclick', 'ngMousedown', 'ngMouseenter', 'ngMouseleave',
      'ngMousemove', 'ngMouseover', 'ngMouseup', 'ngKeydown', 'ngKeypress', 'ngKeyup'];

    $provide.decorator('ngSrcDirective', ['$delegate', 'pdl', function ($delegate: any[], pdl: IPdl): any {
      let ngSrc: any = $delegate[0];
      ngSrc.compile = function (): any {
        return function ($scope: ng.IScope, element: JQuery, attr: ng.IAttributes): void {
          Observable.fromEvent(element, 'load').subscribe((event: any) => {
            if (event.target.attributes.promo) {
              pdl.trackEvent({
                event: event,
                scope: $scope
              });
            }
          });

          attr.$observe('ngSrc', (value) => {
            attr.$set('src', value);
          });
        };
      };
      delete ngSrc.link;
      return $delegate;
    }]);

    directives.forEach((directive: string) => {
      let directiveName: string = directive + 'Directive';

      $provide.decorator(directiveName, ['$delegate', '$rootScope', '$parse', 'pdl',
        function($delegate: any[], $rootScope: ng.IScope, $parse: ng.IParseService, pdl: IPdl): any {
          $delegate[0].compile = function(elementOuter: JQuery, attrs: ng.IAttributes): any {
            let fn: (scope: ng.IScope, payload: any) => void = $parse(attrs[directive]),
              eventName: string = directive.toLowerCase().substr(2);

            return function ngEventHandler(scope: ng.IScope, element: JQuery): void {
              let subscription: Subscription = Observable.fromEvent(element, eventName)
                .subscribe((event: any) => {
                  pdl.trackEvent({
                    event: event,
                    scope: scope
                  });

                  var callback: () => void = function(): void {
                    fn(scope, {
                      $event: event,
                      $element: element
                    });
                  };

                  if ($rootScope.$$phase) { // this is a flag set during $digest cycle
                    scope.$evalAsync(callback);
                  } else {
                    scope.$apply(callback);
                  }
              });

              scope.$on('$destroy', function (): void {
                subscription.unsubscribe(); // destroy the observable subscription
              });
            };
          };
          return $delegate;
      }]);
    });

  }
}
