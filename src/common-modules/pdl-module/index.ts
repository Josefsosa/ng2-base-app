/**
 * @module PDL
 *
 * PDL Framework implementation using RxJS observables.
 */
/** */

import { PdlProvider } from './services/pdl.provider';
import { IPdl } from './pdl.interfaces';
import { PdlPageUtil } from './utils/pdl.page.utils';
import { PdlDirectiveDecorator } from './services/pdl.directive.decorator';
import { PdlConsoleObserver } from './services/pdl-console-observer.service';
import { PdlEnsightenObserver } from './services/pdl-ensighten-observer.service';

/**
 * PDL AngularJS Module Declaration
 */
export const pdlModule: ng.IModule = angular.module('ref.pdl', []);

pdlModule.provider('pdl', PdlProvider);
pdlModule.service('pdlPageUtil', <any>PdlPageUtil);
pdlModule.service('pdlConsoleObserver', PdlConsoleObserver);
pdlModule.service('pdlEnsightenObserver', <any>PdlEnsightenObserver);

/**
 * Decorate the AngularJS directives.
 */
pdlModule.config(['$provide', ($provide: ng.auto.IProvideService) => {
  let decorator: PdlDirectiveDecorator = new PdlDirectiveDecorator();
  decorator.decorate($provide);
}]);

/**
 * Register PDL subscribers.
 * Custom observers shoud be written here
 */
pdlModule.run(['pdl', 'pdlConsoleObserver', 'pdlEnsightenObserver',
  (pdl: IPdl, pdlConsoleObserver: PdlConsoleObserver, pdlEnsightenObserver: PdlEnsightenObserver) => {
    pdl.init();
    pdl.subscribe(pdlConsoleObserver);
    pdl.subscribe(pdlEnsightenObserver);
  }
]);
