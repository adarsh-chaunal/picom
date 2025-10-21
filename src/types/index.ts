// Core Types for Picom UI Library

/**
 * Base configuration interface for all components
 */
export interface BaseConfig {
  /** Unique identifier for the component */
  id?: string;
  /** CSS class name to add to the component */
  className?: string;
  /** Custom data attributes */
  data?: Record<string, string>;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is visible */
  visible?: boolean;
}

/**
 * Event handler function type
 */
export type EventHandler<T = Event> = (event: T) => void;

/**
 * Component lifecycle methods
 */
export interface ComponentLifecycle {
  onMounted?(): void;
  onBeforeDispose?(): void;
  onDisposed?(): void;
}

/**
 * Base component interface
 */
export interface BaseComponentInterface extends ComponentLifecycle {
  readonly type: string;
  readonly id: string;
  readonly element: HTMLElement | null;
  readonly isDisposed: boolean;
  
  render(): HTMLElement;
  dispose(): void;
  updateConfig(newConfig: Partial<BaseConfig>): void;
  addEventHandler(element: HTMLElement, event: string, handler: EventHandler): void;
}

/**
 * Component manager interface
 */
export interface ComponentManagerInterface {
  renderComponent<T extends BaseComponentInterface>(
    component: new (config: any) => T,
    container: HTMLElement,
    options?: { config?: any }
  ): ComponentData<T> | null;
  
  disposeComponent(componentId: string): boolean;
  disposeComponentsInContainer(container: HTMLElement): number;
  disposeAllComponents(): number;
  getComponent(componentId: string): ComponentData<any> | undefined;
  getComponentsByType(type: string): ComponentData<any>[];
  getStats(): ComponentStats;
}

/**
 * Component data structure
 */
export interface ComponentData<T extends BaseComponentInterface> {
  id: string;
  element: HTMLElement;
  instance: T;
  dispose: () => void;
}

/**
 * Component statistics
 */
export interface ComponentStats {
  total: number;
  byType: Record<string, number>;
  memoryUsage: number;
}

/**
 * CSS Loader interface
 */
export interface CSSLoaderInterface {
  loadComponentCSS(componentName: string): void;
  loadAllCSS(): void;
  isLoaded(componentName: string): boolean;
}
