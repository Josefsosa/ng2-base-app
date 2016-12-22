/**
 * @module PDL
 */
 /** */

import { Observable, Subscription } from 'rxjs/Rx';

/**
 * PDL Event structure.
 */
export interface IPdlEvent {
  /**
   * Event object.
   */
  event: any;

  /**
   * AngularJS scope in which the event was triggered.
   */
  scope: ng.IScope;
}

/**
 * PDL Page View Event structure
 */
export interface IPdlPageViewEvent {
  /**
   * Previous UI Router state.
   */
  toState: ng.ui.IState;

  /**
   * New UI Router state.
   */
  fromState: ng.ui.IState;
}

/**
 * Interface for any PDL observer. Implement this interface to write a Custom
 * PDL observer.
 */
export interface IPdlObserver {
  /**
   * Tracks page details on state change
   * @param event PDL Page View Event
   */
  trackPageView(event: IPdlPageViewEvent): void;

  /**
   * Tracks PDL event
   * @param event PDL Event
   */
  trackEvent(event: IPdlEvent): void;
}

/**
 * Interface of a PDL observable implementation.
 */
export interface IPdlObservable {
  /**
   * Subscribes a PDL observer in the observable.
   * @param observer PDL observer instance.
   * @returns RxJS subscription instance, allows clients to unsubscribe.
   */
  subscribe(observer: IPdlObserver): Subscription;

  /**
   * Returns an observable for page view events.
   * @returns IPdlPageViewEvent observable.
   */
  getPageViewObservable(): Observable<IPdlPageViewEvent>;

  /**
   * Returns an observable for events tracked.
   * @returns IPdlEvent observable.
   */
  getEventObservable(): Observable<IPdlEvent>;
}

/**
 * PDL service interface. The service itself is a PDL observable and observer.
 */
export interface IPdl extends IPdlObserver, IPdlObservable {
  /**
   * Initializes the PDL listener.
   */
  init(): void;

  /**
   * Watches an AngularJS scope for changes and triggers events on change.
   * @param scope AngularJS scope to watch.
   */
  watch(scope: ng.IScope): void;
}
