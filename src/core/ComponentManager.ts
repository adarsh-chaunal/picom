import type { BaseComponentInterface, ComponentManagerInterface, ComponentData, ComponentStats } from '../types';

/**
 * Component Lifecycle Manager - Handles rendering and disposal of components
 */
export class ComponentManager implements ComponentManagerInterface {
  private activeComponents = new Map<string, ComponentData<any>>();
  private componentCounter = 0;

  /**
   * Render a component and track it
   */
  public renderComponent<T extends BaseComponentInterface>(
    component: new (config: any) => T,
    container: HTMLElement,
    options: { config?: any } = {}
  ): ComponentData<T> | null {
    if (!component || !container) {
      console.warn('ComponentManager: Invalid component or container');
      return null;
    }

    const componentId = `comp-${++this.componentCounter}`;
    
    // Create component instance if it's a class
    let componentInstance: T;
    try {
      componentInstance = new component(options.config || {});
    } catch (error) {
      console.warn('ComponentManager: Error creating component instance:', error);
      return null;
    }

    // Render the component
    const rendered = componentInstance.render();
    if (!rendered) {
      console.warn('ComponentManager: Component render returned empty result');
      return null;
    }

    // Add component ID and metadata
    rendered.setAttribute('data-component-id', componentId);
    rendered.setAttribute('data-component-type', componentInstance.constructor.name);

    // Store component reference
    this.activeComponents.set(componentId, {
      id: componentId,
      element: rendered,
      instance: componentInstance,
      dispose: () => this.disposeComponent(componentId)
    });

    // Append to container
    container.appendChild(rendered);

    // Trigger component mounted event
    this.triggerComponentEvent(componentId, 'mounted', {
      component: componentInstance,
      element: rendered
    });

    return {
      id: componentId,
      element: rendered,
      instance: componentInstance,
      dispose: () => this.disposeComponent(componentId)
    };
  }

  /**
   * Dispose a component by ID
   */
  public disposeComponent(componentId: string): boolean {
    const componentData = this.activeComponents.get(componentId);
    if (!componentData) {
      console.warn(`ComponentManager: Component ${componentId} not found`);
      return false;
    }

    const { instance, element } = componentData;

    // Trigger component before dispose event
    this.triggerComponentEvent(componentId, 'beforeDispose', {
      component: instance,
      element: element
    });

    // Call component dispose method if it exists
    if (instance.dispose && typeof instance.dispose === 'function') {
      try {
        instance.dispose();
      } catch (error) {
        console.error(`ComponentManager: Error disposing component ${componentId}:`, error);
      }
    }

    // Remove from DOM
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }

    // Remove from tracking
    this.activeComponents.delete(componentId);

    // Trigger component disposed event
    this.triggerComponentEvent(componentId, 'disposed', {
      component: instance
    });

    return true;
  }

  /**
   * Dispose all components in a container
   */
  public disposeComponentsInContainer(container: HTMLElement): number {
    const componentsInContainer = container.querySelectorAll('[data-component-id]');
    let disposedCount = 0;

    componentsInContainer.forEach(element => {
      const componentId = element.getAttribute('data-component-id');
      if (componentId && this.disposeComponent(componentId)) {
        disposedCount++;
      }
    });

    return disposedCount;
  }

  /**
   * Dispose all components
   */
  public disposeAllComponents(): number {
    const componentIds = Array.from(this.activeComponents.keys());
    let disposedCount = 0;

    componentIds.forEach(id => {
      if (this.disposeComponent(id)) {
        disposedCount++;
      }
    });

    return disposedCount;
  }

  /**
   * Get component by ID
   */
  public getComponent(componentId: string): ComponentData<any> | undefined {
    return this.activeComponents.get(componentId);
  }

  /**
   * Get all components of a specific type
   */
  public getComponentsByType(type: string): ComponentData<any>[] {
    const components: ComponentData<any>[] = [];
    this.activeComponents.forEach((data, id) => {
      if (data.instance.type === type) {
        components.push({
          ...data,
          id: id
        });
      }
    });
    return components;
  }

  /**
   * Get component statistics
   */
  public getStats(): ComponentStats {
    const stats: ComponentStats = {
      total: this.activeComponents.size,
      byType: {},
      memoryUsage: 0
    };

    this.activeComponents.forEach((data, _id) => {
      const type = data.instance.type;
      stats.byType[type] = (stats.byType[type] || 0) + 1;
      stats.memoryUsage += this.estimateComponentMemory(data);
    });

    return stats;
  }

  /**
   * Estimate memory usage of a component
   */
  private estimateComponentMemory(componentData: ComponentData<any>): number {
    // Simple estimation based on DOM nodes and data
    const element = componentData.element;
    const nodeCount = element.querySelectorAll('*').length + 1; // +1 for the element itself
    return nodeCount * 100; // Rough estimate: 100 bytes per DOM node
  }

  /**
   * Trigger component lifecycle events
   */
  private triggerComponentEvent(componentId: string, eventName: string, data: any): void {
    const event = new CustomEvent(`component:${eventName}`, {
      detail: {
        componentId: componentId,
        ...data
      }
    });
    
    document.dispatchEvent(event);
  }

  /**
   * Clean up old components (older than specified time)
   */
  public cleanupOldComponents(_maxAge: number = 300000): number { // 5 minutes default
    const oldComponents: string[] = [];

    this.activeComponents.forEach((_data, _id) => {
      // Note: We don't track creation time in the current implementation
      // This would need to be added to the ComponentData interface
    });

    oldComponents.forEach(id => this.disposeComponent(id));
    return oldComponents.length;
  }
}

// Global component manager instance
declare global {
  interface Window {
    ComponentManager: ComponentManager;
  }
}

window.ComponentManager = new ComponentManager();

// Auto-cleanup on page unload
window.addEventListener('beforeunload', function() {
  window.ComponentManager.disposeAllComponents();
});
