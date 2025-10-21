// Core Types for Picom UI Library
export {};
//# sourceMappingURL=index.js.map
// Component-specific type definitions
export {};
//# sourceMappingURL=components.js.map
/**
 * Base class for all Picom UI components
 */
export class BaseComponent {
    constructor(type, config = {}) {
        this.element = null;
        this.isDisposed = false;
        this.eventHandlers = [];
        this.type = type;
        this.config = config;
        this.id = config.id || `comp-${Math.random().toString(36).substr(2, 9)}`;
        // Auto-load CSS for this component
        this.loadCSS();
    }
    /**
     * Load CSS for this component type
     */
    loadCSS() {
        if (window.PicomCSSLoader) {
            window.PicomCSSLoader.loadComponentCSS(this.type);
        }
    }
    /**
     * Dispose the component
     */
    dispose() {
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
    addEventHandler(element, event, handler) {
        element.addEventListener(event, handler);
        this.eventHandlers.push({
            element: element,
            event: event,
            fn: handler
        });
    }
    /**
     * Helper method to get the component's DOM element
     */
    getElement() {
        return this.element;
    }
    /**
     * Helper method to update component configuration
     */
    updateConfig(newConfig) {
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
//# sourceMappingURL=BaseComponent.js.map
/**
 * Component Lifecycle Manager - Handles rendering and disposal of components
 */
export class ComponentManager {
    constructor() {
        this.activeComponents = new Map();
        this.componentCounter = 0;
    }
    /**
     * Render a component and track it
     */
    renderComponent(component, container, options = {}) {
        if (!component || !container) {
            console.warn('ComponentManager: Invalid component or container');
            return null;
        }
        const componentId = `comp-${++this.componentCounter}`;
        // Create component instance if it's a class
        let componentInstance;
        try {
            componentInstance = new component(options.config || {});
        }
        catch (error) {
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
    disposeComponent(componentId) {
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
            }
            catch (error) {
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
    disposeComponentsInContainer(container) {
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
    /**
     * Get component by ID
     */
    getComponent(componentId) {
        return this.activeComponents.get(componentId);
    }
    /**
     * Get all components of a specific type
     */
    getComponentsByType(type) {
        const components = [];
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
    getStats() {
        const stats = {
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
    estimateComponentMemory(componentData) {
        // Simple estimation based on DOM nodes and data
        const element = componentData.element;
        const nodeCount = element.querySelectorAll('*').length + 1; // +1 for the element itself
        return nodeCount * 100; // Rough estimate: 100 bytes per DOM node
    }
    /**
     * Trigger component lifecycle events
     */
    triggerComponentEvent(componentId, eventName, data) {
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
    cleanupOldComponents(_maxAge = 300000) {
        const oldComponents = [];
        this.activeComponents.forEach((_data, _id) => {
            // Note: We don't track creation time in the current implementation
            // This would need to be added to the ComponentData interface
        });
        oldComponents.forEach(id => this.disposeComponent(id));
        return oldComponents.length;
    }
}
window.ComponentManager = new ComponentManager();
// Auto-cleanup on page unload
window.addEventListener('beforeunload', function () {
    window.ComponentManager.disposeAllComponents();
});
//# sourceMappingURL=ComponentManager.js.map
import { BaseComponent } from '../../core/BaseComponent';
/**
 * Input component for text input fields
 */
export class InputComponent extends BaseComponent {
    constructor(config = {}) {
        super('input', config);
        this.inputConfig = config;
    }
    render() {
        // Create container
        const container = document.createElement('div');
        container.className = 'picom-textbox';
        // Create label
        const label = document.createElement('label');
        label.textContent = this.inputConfig.label || 'Label';
        label.className = 'picom-textbox-label';
        // Create input
        const input = document.createElement('input');
        input.type = this.inputConfig.type || 'text';
        input.placeholder = this.inputConfig.placeholder || 'Enter text...';
        input.id = this.inputConfig.id || this.id;
        input.className = 'picom-textbox-input';
        input.value = this.inputConfig.value || '';
        // Set attributes
        if (this.inputConfig.required)
            input.required = true;
        if (this.inputConfig.maxLength)
            input.maxLength = this.inputConfig.maxLength;
        if (this.inputConfig.minLength)
            input.minLength = this.inputConfig.minLength;
        if (this.inputConfig.pattern)
            input.pattern = this.inputConfig.pattern;
        if (this.inputConfig.disabled)
            input.disabled = true;
        // Add event handlers
        if (this.inputConfig.onChange) {
            this.addEventHandler(input, 'change', this.inputConfig.onChange);
        }
        if (this.inputConfig.onFocus) {
            this.addEventHandler(input, 'focus', this.inputConfig.onFocus);
        }
        if (this.inputConfig.onBlur) {
            this.addEventHandler(input, 'blur', this.inputConfig.onBlur);
        }
        // Assemble
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
        container.appendChild(input);
        // Store element reference
        this.element = container;
        return container;
    }
    /**
     * Get the current input value
     */
    getValue() {
        const input = this.element?.querySelector('input');
        return input?.value || '';
    }
    /**
     * Set the input value
     */
    setValue(value) {
        const input = this.element?.querySelector('input');
        if (input) {
            input.value = value;
        }
    }
    /**
     * Focus the input
     */
    focus() {
        const input = this.element?.querySelector('input');
        input?.focus();
    }
    /**
     * Blur the input
     */
    blur() {
        const input = this.element?.querySelector('input');
        input?.blur();
    }
    /**
     * Check if the input is valid
     */
    isValid() {
        const input = this.element?.querySelector('input');
        return input?.checkValidity() ?? true;
    }
}
//# sourceMappingURL=InputComponent.js.map
import { BaseComponent } from '../../core/BaseComponent';
/**
 * Button component for interactive buttons
 */
export class ButtonComponent extends BaseComponent {
    constructor(config) {
        super('button', config);
        this.buttonConfig = config;
    }
    render() {
        const button = document.createElement('button');
        button.textContent = this.buttonConfig.text;
        button.id = this.buttonConfig.id || this.id;
        button.className = this.getButtonClasses();
        button.type = this.buttonConfig.type || 'button';
        // Set attributes
        if (this.buttonConfig.disabled)
            button.disabled = true;
        // Add event handlers
        if (this.buttonConfig.onClick) {
            this.addEventHandler(button, 'click', this.buttonConfig.onClick);
        }
        if (this.buttonConfig.onFocus) {
            this.addEventHandler(button, 'focus', this.buttonConfig.onFocus);
        }
        if (this.buttonConfig.onBlur) {
            this.addEventHandler(button, 'blur', this.buttonConfig.onBlur);
        }
        // Store element reference
        this.element = button;
        return button;
    }
    /**
     * Get CSS classes for the button
     */
    getButtonClasses() {
        const classes = ['picom-button'];
        if (this.buttonConfig.variant) {
            classes.push(`picom-button-${this.buttonConfig.variant}`);
        }
        if (this.buttonConfig.size) {
            classes.push(`picom-button-${this.buttonConfig.size}`);
        }
        if (this.buttonConfig.className) {
            classes.push(this.buttonConfig.className);
        }
        return classes.join(' ');
    }
    /**
     * Set button text
     */
    setText(text) {
        if (this.element) {
            this.element.textContent = text;
        }
    }
    /**
     * Get button text
     */
    getText() {
        return this.element?.textContent || '';
    }
    /**
     * Enable the button
     */
    enable() {
        if (this.element) {
            this.element.disabled = false;
        }
    }
    /**
     * Disable the button
     */
    disable() {
        if (this.element) {
            this.element.disabled = true;
        }
    }
    /**
     * Focus the button
     */
    focus() {
        this.element?.focus();
    }
    /**
     * Click the button programmatically
     */
    click() {
        this.element?.click();
    }
}
//# sourceMappingURL=ButtonComponent.js.map
// Picom UI Library - TypeScript Entry Point
// Core exports
export { BaseComponent } from './core/BaseComponent';
export { ComponentManager } from './core/ComponentManager';
// Component exports
export { InputComponent } from './components/input/InputComponent';
export { ButtonComponent } from './components/button/ButtonComponent';
// Type exports
export * from './types';
export * from './types/components';
// Re-export for global usage
import { ComponentManager } from './core/ComponentManager';
import { InputComponent } from './components/input/InputComponent';
import { ButtonComponent } from './components/button/ButtonComponent';
import { BaseComponent } from './core/BaseComponent';
// Make components available globally for backward compatibility
if (typeof window !== 'undefined') {
    window.InputComponent = InputComponent;
    window.ButtonComponent = ButtonComponent;
    window.BaseComponent = BaseComponent;
}
//# sourceMappingURL=index.js.map
