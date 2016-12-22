/**
 * @module Common.Utils
 */
/** */

/**
 * Registers the digitalData object.
 * @param window Browser's window object.
 */
export let registerDigitalData: (window: any) => void = (window: any): void => {
  let userAgent: string = navigator.userAgent,
    digitalData: any = {
      page: {
          pageTitle: '',
          pageName: '',
          pageURL: '',
          previousPageURL: '',
          prevPageName: '',
          siteSection: '',
          siteSubSection: '',
          language: '',
          server: '',
          responsiveState: ''
      },
      events: [
        {
          eventName: '',
          navType: '',
          pageName: '',
          pageUrl: '',
          eventAction: 'click',
          timeStamp: ''
        }
      ],
      triggerEvent: function (eventName: string): void {
          /*let eventNameCustomEvent: CustomEvent = new CustomEvent('digitalDataReady', {
              detail: eventName
          });
          window.dispatchEvent(eventNameCustomEvent);*/
      }
  };

  // polyfill the CustomEvent() constructor functionality in Internet Explorer 9 and higher with the following code
  if (window.ActiveXObject || 'ActiveXObject' in window || userAgent.indexOf('PhantomJS') !== -1) {
      (function (): void {
          function CustomEvent(event: any, params: any): any {
              params = params || {
                  bubbles: false,
                  cancelable: false,
                  detail: undefined
              };
              var evt: any = document.createEvent('CustomEvent');
              evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
              return evt;
          }

          CustomEvent.prototype = window.Event.prototype;

          window.CustomEvent = CustomEvent;
      })();
  }

  window.digitalData = digitalData;

  // listen for custom events
  window.addEventListener('digitalDataReady', (e: any) => {
    console.log('PDL Ready');
  });

  /**
   * Dispatches the digitalDataReady event
   */
  window.dispatchEvent(new CustomEvent('digitalDataReady', {
      detail: 'PDL Ready'
  }));
};
