// Component Lifecycle Manager - Handles rendering and disposal of components
class ComponentManager {
    constructor() {
        this.activeComponents = new Map();
        this.componentCounter = 0;
    }

    // Render a component and track it
    renderComponent(component, container, options = {}) {
        if (!component || !container) {
            console.warn('ComponentManager: Invalid component or container');
            return null;
        }

        const componentId = `comp-${++this.componentCounter}`;
        const $container = $(container);
        
        // Create component instance if it's a class
        let componentInstance;
        if (typeof component === 'function') {
            componentInstance = new component(options.config || {});
        } else if (component.render) {
            componentInstance = component;
        } else {
            console.warn('ComponentManager: Invalid component type');
            return null;
        }

        // Render the component
        const $rendered = componentInstance.render();
        if (!$rendered || $rendered.length === 0) {
            console.warn('ComponentManager: Component render returned empty result');
            return null;
        }

        // Add component ID and metadata
        $rendered.attr('data-component-id', componentId);
        $rendered.attr('data-component-type', componentInstance.constructor.name);

        // Store component reference
        this.activeComponents.set(componentId, {
            instance: componentInstance,
            element: $rendered,
            container: $container,
            type: componentInstance.constructor.name,
            created: Date.now()
        });

        // Append to container
        $container.append($rendered);

        // Trigger component mounted event
        this.triggerComponentEvent(componentId, 'mounted', {
            component: componentInstance,
            element: $rendered
        });

        return {
            id: componentId,
            element: $rendered,
            instance: componentInstance,
            dispose: () => this.disposeComponent(componentId)
        };
    }

    // Dispose a component by ID
    disposeComponent(componentId) {
        const componentData = this.activeComponents.get(componentId);
        if (!componentData) {
            console.warn(`ComponentManager: Component ${componentId} not found`);
            return false;
        }

        const { instance, element, container } = componentData;

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
        element.remove();

        // Remove from tracking
        this.activeComponents.delete(componentId);

        // Trigger component disposed event
        this.triggerComponentEvent(componentId, 'disposed', {
            component: instance
        });

        return true;
    }

    // Dispose all components in a container
    disposeComponentsInContainer(container) {
        const $container = $(container);
        const componentsInContainer = $container.find('[data-component-id]');
        let disposedCount = 0;

        componentsInContainer.each((index, element) => {
            const componentId = $(element).attr('data-component-id');
            if (componentId && this.disposeComponent(componentId)) {
                disposedCount++;
            }
        });

        return disposedCount;
    }

    // Dispose all components
    disposeAllComponents() {
        const componentIds = Array.from(this.activeComponents.keys());
        let disposedCount = 0;

        componentIds.forEach(id => {
            if (this.disposeComponent(id)) {
                disposedCount++;
            }
        });

        return disposedCount;
    }

    // Get component by ID
    getComponent(componentId) {
        return this.activeComponents.get(componentId);
    }

    // Get all components of a specific type
    getComponentsByType(type) {
        const components = [];
        this.activeComponents.forEach((data, id) => {
            if (data.type === type) {
                components.push({
                    id: id,
                    ...data
                });
            }
        });
        return components;
    }

    // Get component statistics
    getStats() {
        const stats = {
            total: this.activeComponents.size,
            byType: {},
            memoryUsage: 0
        };

        this.activeComponents.forEach((data, id) => {
            stats.byType[data.type] = (stats.byType[data.type] || 0) + 1;
            stats.memoryUsage += this.estimateComponentMemory(data);
        });

        return stats;
    }

    // Estimate memory usage of a component
    estimateComponentMemory(componentData) {
        // Simple estimation based on DOM nodes and data
        const element = componentData.element;
        const nodeCount = element.find('*').length + 1; // +1 for the element itself
        return nodeCount * 100; // Rough estimate: 100 bytes per DOM node
    }

    // Trigger component lifecycle events
    triggerComponentEvent(componentId, eventName, data) {
        const event = $.Event(`component:${eventName}`, {
            componentId: componentId,
            ...data
        });
        
        $(document).trigger(event);
    }

    // Clean up old components (older than specified time)
    cleanupOldComponents(maxAge = 300000) { // 5 minutes default
        const now = Date.now();
        const oldComponents = [];

        this.activeComponents.forEach((data, id) => {
            if (now - data.created > maxAge) {
                oldComponents.push(id);
            }
        });

        oldComponents.forEach(id => this.disposeComponent(id));
        return oldComponents.length;
    }
}

// Global component manager instance
window.ComponentManager = new ComponentManager();

// jQuery plugin for easy component management
$.fn.renderComponent = function(component, options = {}) {
    return window.ComponentManager.renderComponent(component, this, options);
};

$.fn.disposeComponents = function() {
    return window.ComponentManager.disposeComponentsInContainer(this);
};

// Auto-cleanup on page unload
$(window).on('beforeunload', function() {
    window.ComponentManager.disposeAllComponents();
});
