import type { BaseConfig, BaseComponentInterface, EventHandler } from '../types';

/**
 * Base class for all Picom UI components
 */
export abstract class BaseComponent implements BaseComponentInterface {
  public readonly type: string;
  public readonly id: string;
  public element: HTMLElement | null = null;
  public isDisposed: boolean = false;
  protected eventHandlers: Array<{
    element: HTMLElement;
    event: string;
    fn: EventHandler;
  }> = [];

  constructor(type: string, config: BaseConfig = {}) {
    this.type = type;
    this.config = config;
    this.id = config.id || `comp-${Math.random().toString(36).substr(2, 9)}`;
    
    // Auto-load CSS for this component
    this.loadCSS();
  }

  protected config: BaseConfig;

  /**
   * Abstract render method that must be implemented by subclasses
   */
  public abstract render(): HTMLElement;

  /**
   * Load CSS for this component type
   */
  protected loadCSS(): void {
    if (window.PicomCSSLoader) {
      window.PicomCSSLoader.loadComponentCSS(this.type);
    }
  }

  /**
   * Lifecycle method - called when component is mounted
   */
  public onMounted?(): void;

  /**
   * Lifecycle method - called before component is disposed
   */
  public onBeforeDispose?(): void;

  /**
   * Lifecycle method - called after component is disposed
   */
  public onDisposed?(): void;

  /**
   * Dispose the component
   */
  public dispose(): void {
    if (this.isDisposed) {
      return;
    }

    this.onBeforeDispose?.();

    // Remove all event handlers
    this.eventHandlers.forEach(handler => {
      if (handler.element && handler.event && handler.fn) {
        handler.element.removeEventListener(handler.event, handler.fn);
      }
    });
    this.eventHandlers = [];

    // Remove element from DOM if it exists
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    // Clear element reference
    this.element = null;
    this.isDisposed = true;

    this.onDisposed?.();
  }

  /**
   * Helper method to add event handlers that will be cleaned up
   */
  public addEventHandler<T = Event>(element: HTMLElement, event: string, handler: EventHandler<T>): void {
    element.addEventListener(event, handler as EventListener);
    
    this.eventHandlers.push({
      element: element,
      event: event,
      fn: handler as EventHandler
    });
  }

  /**
   * Helper method to get the component's DOM element
   */
  public getElement(): HTMLElement | null {
    return this.element;
  }

  /**
   * Helper method to update component configuration
   */
  public updateConfig(newConfig: Partial<BaseConfig>): void {
    this.config = { ...this.config, ...newConfig };
    // Trigger custom event if element exists
    if (this.element) {
      const event = new CustomEvent('component:configUpdated', {
        detail: newConfig
      });
      this.element.dispatchEvent(event);
    }
  }
}
