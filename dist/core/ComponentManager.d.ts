import type { BaseComponentInterface, ComponentManagerInterface, ComponentData, ComponentStats } from '../types';
/**
 * Component Lifecycle Manager - Handles rendering and disposal of components
 */
export declare class ComponentManager implements ComponentManagerInterface {
    private activeComponents;
    private componentCounter;
    /**
     * Render a component and track it
     */
    renderComponent<T extends BaseComponentInterface>(component: new (config: any) => T, container: HTMLElement, options?: {
        config?: any;
    }): ComponentData<T> | null;
    /**
     * Dispose a component by ID
     */
    disposeComponent(componentId: string): boolean;
    /**
     * Dispose all components in a container
     */
    disposeComponentsInContainer(container: HTMLElement): number;
    /**
     * Dispose all components
     */
    disposeAllComponents(): number;
    /**
     * Get component by ID
     */
    getComponent(componentId: string): ComponentData<any> | undefined;
    /**
     * Get all components of a specific type
     */
    getComponentsByType(type: string): ComponentData<any>[];
    /**
     * Get component statistics
     */
    getStats(): ComponentStats;
    /**
     * Estimate memory usage of a component
     */
    private estimateComponentMemory;
    /**
     * Trigger component lifecycle events
     */
    private triggerComponentEvent;
    /**
     * Clean up old components (older than specified time)
     */
    cleanupOldComponents(_maxAge?: number): number;
}
declare global {
    interface Window {
        ComponentManager: ComponentManager;
    }
}
//# sourceMappingURL=ComponentManager.d.ts.map