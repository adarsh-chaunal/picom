import type { BaseConfig, BaseComponentInterface, EventHandler } from '../types';
/**
 * Base class for all Picom UI components
 */
export declare abstract class BaseComponent implements BaseComponentInterface {
    readonly type: string;
    readonly id: string;
    element: HTMLElement | null;
    isDisposed: boolean;
    protected eventHandlers: Array<{
        element: HTMLElement;
        event: string;
        fn: EventHandler;
    }>;
    constructor(type: string, config?: BaseConfig);
    protected config: BaseConfig;
    /**
     * Abstract render method that must be implemented by subclasses
     */
    abstract render(): HTMLElement;
    /**
     * Load CSS for this component type
     */
    protected loadCSS(): void;
    /**
     * Lifecycle method - called when component is mounted
     */
    onMounted?(): void;
    /**
     * Lifecycle method - called before component is disposed
     */
    onBeforeDispose?(): void;
    /**
     * Lifecycle method - called after component is disposed
     */
    onDisposed?(): void;
    /**
     * Dispose the component
     */
    dispose(): void;
    /**
     * Helper method to add event handlers that will be cleaned up
     */
    addEventHandler<T = Event>(element: HTMLElement, event: string, handler: EventHandler<T>): void;
    /**
     * Helper method to get the component's DOM element
     */
    getElement(): HTMLElement | null;
    /**
     * Helper method to update component configuration
     */
    updateConfig(newConfig: Partial<BaseConfig>): void;
}
//# sourceMappingURL=BaseComponent.d.ts.map