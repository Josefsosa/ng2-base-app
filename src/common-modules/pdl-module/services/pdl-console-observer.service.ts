/**
 * @module PDL
 */
 /** */
import { IPdlObserver, IPdlPageViewEvent, IPdlEvent } from '../pdl.interfaces';

/**
 * PDL console output obsever.
 */
export class PdlConsoleObserver implements IPdlObserver {

  /**
   * Tracks page details on state change
   * @param event PDL Page View Event
   */
  public trackPageView(event: IPdlPageViewEvent): void {
    console.log('PDL TRACK PAGE VIEW', event.toState, event.fromState);
  }

  /**
   * Tracks PDL event
   * @param event PDL Event
   */
  public trackEvent(event: IPdlEvent): void {
    let action: any = event.event;
    console.log('PDL TRACK EVENT => ' + (action.detail || action.type || action), event.scope);
  }
}
