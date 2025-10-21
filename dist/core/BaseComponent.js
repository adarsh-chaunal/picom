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