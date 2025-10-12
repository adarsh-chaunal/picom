// CSS Loader - Automatically loads component CSS
class CSSLoader {
    constructor() {
        this.loadedStyles = new Set();
        this.styleElement = null;
    }

    // Load CSS for a component
    loadComponentCSS(componentName) {
        if (this.loadedStyles.has(componentName)) {
            return; // Already loaded
        }

        // For bundled version, CSS is already included
        // This is mainly for development or when using individual components
        if (typeof window.PICOM_BUNDLED !== 'undefined' && window.PICOM_BUNDLED) {
            this.loadedStyles.add(componentName);
            return;
        }

        // Load individual component CSS (for development)
        this.injectCSS(componentName);
        this.loadedStyles.add(componentName);
    }

    // Inject CSS into the document
    injectCSS(componentName) {
        const cssMap = {
            'input': `
                .picom-textbox {
                    margin-bottom: 15px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .picom-textbox-label {
                    font-weight: 600;
                    display: block;
                    margin-bottom: 5px;
                    color: #333;
                    font-size: 14px;
                }
                .picom-textbox-input {
                    width: 100%;
                    padding: 10px 12px;
                    border: 2px solid #e1e5e9;
                    border-radius: 6px;
                    font-size: 14px;
                    transition: border-color 0.2s ease;
                    box-sizing: border-box;
                }
                .picom-textbox-input:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                }
                .picom-textbox-input::placeholder {
                    color: #6c757d;
                }
            `,
            'button': `
                .picom-button {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
                }
                .picom-button:hover {
                    background: #0056b3;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
                }
                .picom-button:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
                }
                .picom-button:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
                }
            `,
            'checkbox': `
                .picom-checkbox {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .picom-checkbox-input {
                    width: 18px;
                    height: 18px;
                    margin-right: 8px;
                    cursor: pointer;
                    accent-color: #007bff;
                }
                .picom-checkbox-label {
                    font-weight: 500;
                    cursor: pointer;
                    color: #333;
                    font-size: 14px;
                    user-select: none;
                }
                .picom-checkbox-label:hover {
                    color: #007bff;
                }
            `,
            'select': `
                .picom-select {
                    margin-bottom: 15px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .picom-select-label {
                    font-weight: 600;
                    display: block;
                    margin-bottom: 5px;
                    color: #333;
                    font-size: 14px;
                }
                .picom-select-input {
                    width: 100%;
                    padding: 10px 12px;
                    border: 2px solid #e1e5e9;
                    border-radius: 6px;
                    background-color: white;
                    cursor: pointer;
                    font-size: 14px;
                    transition: border-color 0.2s ease;
                    box-sizing: border-box;
                }
                .picom-select-input:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                }
                .picom-select-input:hover {
                    border-color: #007bff;
                }
            `
        };

        const css = cssMap[componentName];
        if (css) {
            this.addStyleToDocument(css);
        }
    }

    // Add CSS to document
    addStyleToDocument(css) {
        if (!this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.setAttribute('data-picom-css', 'true');
            document.head.appendChild(this.styleElement);
        }
        
        this.styleElement.textContent += css;
    }

    // Check if CSS is already loaded
    isLoaded(componentName) {
        return this.loadedStyles.has(componentName);
    }

    // Load all component CSS
    loadAllCSS() {
        const components = ['input', 'button', 'checkbox', 'select', 'card', 'navbar', 'hero', 'section'];
        components.forEach(component => this.loadComponentCSS(component));
    }
}

// Global CSS loader instance
window.PicomCSSLoader = new CSSLoader();

// Auto-load CSS when components are used
document.addEventListener('DOMContentLoaded', function() {
    // Mark as bundled if using dist files
    if (document.querySelector('script[src*="dist/picom.js"]')) {
        window.PICOM_BUNDLED = true;
    }
});


// Common utilities and base classes

class BaseComponent {
    constructor(type, config = {}) {
        this.type = type;
        this.config = config;
        this.id = config.id || `comp-${Math.random().toString(36).substr(2, 9)}`;
        this.element = null;
        this.isDisposed = false;
        this.eventHandlers = [];
        
        // Auto-load CSS for this component
        this.loadCSS();
    }

    // Load CSS for this component type
    loadCSS() {
        if (window.PicomCSSLoader) {
            window.PicomCSSLoader.loadComponentCSS(this.type);
        }
    }

    render() {
        throw new Error('Render method not implemented');
    }

    // Lifecycle method - called when component is mounted
    onMounted() {
        // Override in subclasses if needed
    }

    // Lifecycle method - called before component is disposed
    onBeforeDispose() {
        // Override in subclasses if needed
    }

    // Lifecycle method - called after component is disposed
    onDisposed() {
        // Override in subclasses if needed
    }

    // Dispose the component
    dispose() {
        if (this.isDisposed) {
            return;
        }

        this.onBeforeDispose();

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

        this.onDisposed();
    }

    // Helper method to add event handlers that will be cleaned up
    addEventHandler(element, event, handler) {
        element.addEventListener(event, handler);
        
        this.eventHandlers.push({
            element: element,
            event: event,
            fn: handler
        });
    }

    // Helper method to get the component's DOM element
    getElement() {
        return this.element;
    }

    // Helper method to update component configuration
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


// Pub / sub for component communication

const EventBus = $({});

function publish(event, data) {
    EventBus.trigger(event, data);
}

function subscribe(event, handler) {
    EventBus.on(event, handler);
}


// DOM helpers - Pure vanilla JS

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}


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
            instance: componentInstance,
            element: rendered,
            container: container,
            type: componentInstance.constructor.name,
            created: Date.now()
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

    // Dispose all components in a container
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
        const nodeCount = element.querySelectorAll('*').length + 1; // +1 for the element itself
        return nodeCount * 100; // Rough estimate: 100 bytes per DOM node
    }

    // Trigger component lifecycle events
    triggerComponentEvent(componentId, eventName, data) {
        const event = new CustomEvent(`component:${eventName}`, {
            detail: {
                componentId: componentId,
                ...data
            }
        });
        
        document.dispatchEvent(event);
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

// Auto-cleanup on page unload
window.addEventListener('beforeunload', function() {
    window.ComponentManager.disposeAllComponents();
});


// Website Builder - Build websites from JSON configuration
class WebsiteBuilder {
    constructor(containerId) {
        this.container = $(`#${containerId}`);
        this.components = {
            navbar: NavbarComponent,
            hero: HeroComponent,
            section: SectionComponent,
            card: CardComponent,
            button: ButtonComponent,
            input: InputComponent,
            checkbox: CheckboxComponent,
            select: SelectComponent,
            layout: LayoutComponent
        };
    }

    buildFromJSON(config) {
        if (!config || !config.pages) {
            console.error('Invalid website configuration');
            return;
        }

        // Clear container
        this.container.empty();

        // Build each page
        config.pages.forEach(page => {
            this.buildPage(page);
        });
    }

    buildPage(pageConfig) {
        const $page = $('<div>').addClass('page');
        
        // Add page ID if specified
        if (pageConfig.id) {
            $page.attr('id', pageConfig.id);
        }

        // Add page classes
        if (pageConfig.className) {
            $page.addClass(pageConfig.className);
        }

        // Check if page uses a layout
        if (pageConfig.layout) {
            // Build layout component
            const $layout = this.buildComponent({
                type: 'layout',
                config: pageConfig.layout
            });
            if ($layout) {
                $page.append($layout);
            }
        } else if (pageConfig.components && Array.isArray(pageConfig.components)) {
            // Build individual components
            pageConfig.components.forEach(componentConfig => {
                const $component = this.buildComponent(componentConfig);
                if ($component) {
                    $page.append($component);
                }
            });
        }

        this.container.append($page);
    }

    buildComponent(config) {
        if (!config.type) {
            console.warn('Component config missing type:', config);
            return null;
        }

        const ComponentClass = this.components[config.type];
        if (!ComponentClass) {
            console.warn('Unknown component type:', config.type);
            return null;
        }

        try {
            const component = new ComponentClass(config.config || {});
            return component.render();
        } catch (error) {
            console.error('Error building component:', config.type, error);
            return null;
        }
    }

    // Utility method to load website from JSON file
    loadFromFile(jsonPath, callback) {
        $.getJSON(jsonPath)
            .done((data) => {
                this.buildFromJSON(data);
                if (callback) callback(null, data);
            })
            .fail((error) => {
                console.error('Failed to load website JSON:', error);
                if (callback) callback(error, null);
            });
    }

    // Method to get current website configuration
    getCurrentConfig() {
        // This would need to be implemented to reverse-engineer the current state
        // For now, return a basic structure
        return {
            pages: [{
                id: 'home',
                components: []
            }]
        };
    }
}


class LayoutComponent extends BaseComponent {
    constructor(config = {}) {
        super('layout', config);
        this.layouts = {
            'default': this.defaultLayout,
            'landing': this.landingLayout,
            'dashboard': this.dashboardLayout,
            'blog': this.blogLayout,
            'portfolio': this.portfolioLayout,
            'minimal': this.minimalLayout,
            'sidebar': this.sidebarLayout,
            'grid': this.gridLayout
        };
    }

    render() {
        const layoutType = this.config.type || 'default';
        const layoutFunction = this.layouts[layoutType];
        
        if (!layoutFunction) {
            console.warn(`Unknown layout type: ${layoutType}`);
            return this.defaultLayout();
        }

        return layoutFunction();
    }

    // Default layout - basic structure
    defaultLayout() {
        const layout = document.createElement('div');
        layout.className = 'picom-layout default-layout';
        
        // Header
        if (this.config.header) {
            const $header = this.buildComponent('header', this.config.header);
            $layout.append($header);
        }

        // Main content
        const $main = createElement('main', 'layout-main');
        if (this.config.content) {
            const $content = this.buildContent(this.config.content);
            $main.append($content);
        }
        $layout.append($main);

        // Footer
        if (this.config.footer) {
            const $footer = this.buildComponent('footer', this.config.footer);
            $layout.append($footer);
        }

        return $layout;
    }

    // Landing page layout
    landingLayout() {
        const $layout = createElement('div', 'ui-layout landing-layout');
        
        // Navigation
        if (this.config.navbar) {
            const $navbar = this.buildComponent('navbar', this.config.navbar);
            $layout.append($navbar);
        }

        // Hero section
        if (this.config.hero) {
            const $hero = this.buildComponent('hero', this.config.hero);
            $layout.append($hero);
        }

        // Content sections
        if (this.config.sections && Array.isArray(this.config.sections)) {
            this.config.sections.forEach(section => {
                const $section = this.buildComponent('section', section);
                $layout.append($section);
            });
        }

        // Footer
        if (this.config.footer) {
            const $footer = this.buildComponent('footer', this.config.footer);
            $layout.append($footer);
        }

        return $layout;
    }

    // Dashboard layout
    dashboardLayout() {
        const $layout = createElement('div', 'ui-layout dashboard-layout');
        
        // Sidebar
        if (this.config.sidebar) {
            const $sidebar = this.buildComponent('sidebar', this.config.sidebar);
            $layout.append($sidebar);
        }

        // Main content area
        const $main = createElement('div', 'dashboard-main');
        
        // Top bar
        if (this.config.topbar) {
            const $topbar = this.buildComponent('topbar', this.config.topbar);
            $main.append($topbar);
        }

        // Content
        if (this.config.content) {
            const $content = this.buildContent(this.config.content);
            $main.append($content);
        }

        $layout.append($main);
        return $layout;
    }

    // Blog layout
    blogLayout() {
        const $layout = createElement('div', 'ui-layout blog-layout');
        
        // Header
        if (this.config.header) {
            const $header = this.buildComponent('header', this.config.header);
            $layout.append($header);
        }

        // Main content with sidebar
        const $main = createElement('div', 'blog-main');
        
        // Content area
        const $content = createElement('div', 'blog-content');
        if (this.config.content) {
            const $contentElements = this.buildContent(this.config.content);
            $content.append($contentElements);
        }
        $main.append($content);

        // Sidebar
        if (this.config.sidebar) {
            const $sidebar = this.buildComponent('sidebar', this.config.sidebar);
            $main.append($sidebar);
        }

        $layout.append($main);

        // Footer
        if (this.config.footer) {
            const $footer = this.buildComponent('footer', this.config.footer);
            $layout.append($footer);
        }

        return $layout;
    }

    // Portfolio layout
    portfolioLayout() {
        const $layout = createElement('div', 'ui-layout portfolio-layout');
        
        // Navigation
        if (this.config.navbar) {
            const $navbar = this.buildComponent('navbar', this.config.navbar);
            $layout.append($navbar);
        }

        // Hero
        if (this.config.hero) {
            const $hero = this.buildComponent('hero', this.config.hero);
            $layout.append($hero);
        }

        // Portfolio grid
        if (this.config.portfolio) {
            const $portfolio = this.buildComponent('portfolio', this.config.portfolio);
            $layout.append($portfolio);
        }

        // Footer
        if (this.config.footer) {
            const $footer = this.buildComponent('footer', this.config.footer);
            $layout.append($footer);
        }

        return $layout;
    }

    // Minimal layout
    minimalLayout() {
        const $layout = createElement('div', 'ui-layout minimal-layout');
        
        // Simple header
        if (this.config.header) {
            const $header = this.buildComponent('header', this.config.header);
            $layout.append($header);
        }

        // Centered content
        const $main = createElement('main', 'minimal-main');
        if (this.config.content) {
            const $content = this.buildContent(this.config.content);
            $main.append($content);
        }
        $layout.append($main);

        return $layout;
    }

    // Sidebar layout
    sidebarLayout() {
        const $layout = createElement('div', 'ui-layout sidebar-layout');
        
        // Sidebar
        if (this.config.sidebar) {
            const $sidebar = this.buildComponent('sidebar', this.config.sidebar);
            $layout.append($sidebar);
        }

        // Main content
        const $main = createElement('main', 'sidebar-main');
        if (this.config.content) {
            const $content = this.buildContent(this.config.content);
            $main.append($content);
        }
        $layout.append($main);

        return $layout;
    }

    // Grid layout
    gridLayout() {
        const $layout = createElement('div', 'ui-layout grid-layout');
        
        // Header
        if (this.config.header) {
            const $header = this.buildComponent('header', this.config.header);
            $layout.append($header);
        }

        // Grid container
        const $grid = createElement('div', 'grid-container');
        if (this.config.grid && Array.isArray(this.config.grid)) {
            this.config.grid.forEach(item => {
                const $gridItem = this.buildComponent(item.type, item.config);
                $grid.append($gridItem);
            });
        }
        $layout.append($grid);

        // Footer
        if (this.config.footer) {
            const $footer = this.buildComponent('footer', this.config.footer);
            $layout.append($footer);
        }

        return $layout;
    }

    // Helper method to build components
    buildComponent(type, config) {
        const components = {
            navbar: NavbarComponent,
            hero: HeroComponent,
            section: SectionComponent,
            card: CardComponent,
            button: ButtonComponent,
            input: InputComponent,
            checkbox: CheckboxComponent,
            select: SelectComponent,
            header: this.buildHeader,
            footer: this.buildFooter,
            sidebar: this.buildSidebar,
            topbar: this.buildTopbar,
            portfolio: this.buildPortfolio
        };

        const ComponentClass = components[type];
        if (ComponentClass) {
            if (typeof ComponentClass === 'function' && ComponentClass.prototype && ComponentClass.prototype.render) {
                // It's a component class
                const component = new ComponentClass(config);
                return component.render();
            } else if (typeof ComponentClass === 'function') {
                // It's a helper function
                return ComponentClass.call(this, config);
            }
        }

        console.warn(`Unknown component type: ${type}`);
        return createElement('div', 'unknown-component');
    }

    // Helper method to build content
    buildContent(content) {
        if (typeof content === 'string') {
            return $(content);
        } else if (Array.isArray(content)) {
            const $container = createElement('div', 'content-container');
            content.forEach(item => {
                if (item.type && item.config) {
                    const $component = this.buildComponent(item.type, item.config);
                    $container.append($component);
                }
            });
            return $container;
        }
        return createElement('div', 'empty-content');
    }

    // Helper methods for layout-specific components
    buildHeader(config) {
        const $header = createElement('header', 'layout-header');
        if (config.title) {
            const $title = createElement('h1', 'header-title', config.title);
            $header.append($title);
        }
        if (config.subtitle) {
            const $subtitle = createElement('p', 'header-subtitle', config.subtitle);
            $header.append($subtitle);
        }
        return $header;
    }

    buildFooter(config) {
        const $footer = createElement('footer', 'layout-footer');
        if (config.text) {
            const $text = createElement('p', 'footer-text', config.text);
            $footer.append($text);
        }
        if (config.links && Array.isArray(config.links)) {
            const $links = createElement('div', 'footer-links');
            config.links.forEach(link => {
                const $link = createElement('a', 'footer-link', link.text);
                $link.attr('href', link.href || '#');
                $links.append($link);
            });
            $footer.append($links);
        }
        return $footer;
    }

    buildSidebar(config) {
        const $sidebar = createElement('aside', 'layout-sidebar');
        if (config.title) {
            const $title = createElement('h3', 'sidebar-title', config.title);
            $sidebar.append($title);
        }
        if (config.items && Array.isArray(config.items)) {
            const $nav = createElement('nav', 'sidebar-nav');
            config.items.forEach(item => {
                const $item = createElement('a', 'sidebar-item', item.text);
                $item.attr('href', item.href || '#');
                if (item.active) $item.addClass('active');
                $nav.append($item);
            });
            $sidebar.append($nav);
        }
        return $sidebar;
    }

    buildTopbar(config) {
        const $topbar = createElement('div', 'layout-topbar');
        if (config.title) {
            const $title = createElement('h2', 'topbar-title', config.title);
            $topbar.append($title);
        }
        if (config.actions && Array.isArray(config.actions)) {
            const $actions = createElement('div', 'topbar-actions');
            config.actions.forEach(action => {
                const $button = createElement('button', 'topbar-action', action.text);
                if (action.onClick) $button.on('click', action.onClick);
                $actions.append($button);
            });
            $topbar.append($actions);
        }
        return $topbar;
    }

    buildPortfolio(config) {
        const $portfolio = createElement('div', 'layout-portfolio');
        if (config.title) {
            const $title = createElement('h2', 'portfolio-title', config.title);
            $portfolio.append($title);
        }
        if (config.items && Array.isArray(config.items)) {
            const $grid = createElement('div', 'portfolio-grid');
            config.items.forEach(item => {
                const $item = createElement('div', 'portfolio-item');
                if (item.image) {
                    const $img = createElement('img', 'portfolio-image');
                    $img.attr('src', item.image);
                    $img.attr('alt', item.title || 'Portfolio item');
                    $item.append($img);
                }
                if (item.title) {
                    const $title = createElement('h3', 'portfolio-item-title', item.title);
                    $item.append($title);
                }
                if (item.description) {
                    const $desc = createElement('p', 'portfolio-item-desc', item.description);
                    $item.append($desc);
                }
                $grid.append($item);
            });
            $portfolio.append($grid);
        }
        return $portfolio;
    }
}


class NavbarComponent extends BaseComponent {
    constructor(config = {}) {
        super('navbar', config);
    }

    render() {
        const navbar = document.createElement('nav');
        navbar.className = 'picom-navbar';
        
        // Brand/Logo
        if (this.config.brand) {
            const brand = document.createElement('div');
            brand.className = 'picom-navbar-brand';
            
            if (this.config.brand.logo) {
                const logo = document.createElement('img');
                logo.className = 'picom-navbar-logo';
                logo.src = this.config.brand.logo;
                logo.alt = this.config.brand.text || 'Logo';
                brand.appendChild(logo);
            }
            
            if (this.config.brand.text) {
                const brandText = document.createElement('span');
                brandText.className = 'picom-navbar-brand-text';
                brandText.textContent = this.config.brand.text;
                brand.appendChild(brandText);
            }
            
            if (this.config.brand.href) {
                const brandLink = document.createElement('a');
                brandLink.className = 'picom-navbar-brand-link';
                brandLink.href = this.config.brand.href;
                brandLink.appendChild(brand);
                navbar.appendChild(brandLink);
            } else {
                navbar.appendChild(brand);
            }
        }

        // Navigation Items
        if (this.config.items && Array.isArray(this.config.items)) {
            const navItems = document.createElement('div');
            navItems.className = 'picom-navbar-items';
            
            this.config.items.forEach(item => {
                const navItem = document.createElement('a');
                navItem.className = 'picom-navbar-item';
                navItem.href = item.href || '#';
                navItem.textContent = item.text || 'Link';
                
                if (item.active) {
                    navItem.classList.add('active');
                }
                
                if (item.onClick) {
                    this.addEventHandler(navItem, 'click', (e) => {
                        e.preventDefault();
                        item.onClick();
                    });
                }
                
                navItems.appendChild(navItem);
            });
            
            navbar.appendChild(navItems);
        }

        // Mobile menu toggle
        if (this.config.mobile) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'picom-navbar-mobile-toggle';
            mobileToggle.innerHTML = '☰';
            
            this.addEventHandler(mobileToggle, 'click', () => {
                navbar.classList.toggle('mobile-open');
            });
            
            navbar.appendChild(mobileToggle);
        }

        // Store element reference
        this.element = navbar;
        
        return navbar;
    }
}


class HeroComponent extends BaseComponent {
    constructor(config = {}) {
        super('hero', config);
    }

    render() {
        const hero = document.createElement('section');
        hero.className = 'picom-hero';
        
        // Background image
        if (this.config.background) {
            hero.style.backgroundImage = `url(${this.config.background})`;
        }
        
        // Content container
        const container = document.createElement('div');
        container.className = 'picom-hero-container';
        
        // Title
        if (this.config.title) {
            const title = document.createElement('h1');
            title.className = 'picom-hero-title';
            title.textContent = this.config.title;
            container.appendChild(title);
        }
        
        // Subtitle
        if (this.config.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.className = 'picom-hero-subtitle';
            subtitle.textContent = this.config.subtitle;
            container.appendChild(subtitle);
        }
        
        // Buttons
        if (this.config.buttons && Array.isArray(this.config.buttons)) {
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'picom-hero-buttons';
            
            this.config.buttons.forEach(btn => {
                const button = document.createElement('a');
                button.className = `picom-hero-btn ${btn.variant || 'primary'}`;
                button.href = btn.href || '#';
                button.textContent = btn.text || 'Button';
                
                if (btn.onClick) {
                    this.addEventHandler(button, 'click', (e) => {
                        e.preventDefault();
                        btn.onClick();
                    });
                }
                
                buttonGroup.appendChild(button);
            });
            
            container.appendChild(buttonGroup);
        }
        
        hero.appendChild(container);
        
        // Store element reference
        this.element = hero;
        
        return hero;
    }
}


class SectionComponent extends BaseComponent {
    constructor(config = {}) {
        super('section', config);
    }

    render() {
        const section = document.createElement('section');
        section.className = 'picom-section';
        
        // Add custom classes
        if (this.config.className) {
            section.classList.add(this.config.className);
        }
        
        // Background styling
        if (this.config.background) {
            if (this.config.background.color) {
                section.style.backgroundColor = this.config.background.color;
            }
            if (this.config.background.image) {
                section.style.backgroundImage = `url(${this.config.background.image})`;
                section.style.backgroundSize = 'cover';
                section.style.backgroundPosition = 'center';
            }
        }
        
        // Container
        const container = document.createElement('div');
        container.className = 'picom-section-container';
        
        // Title
        if (this.config.title) {
            const title = document.createElement('h2');
            title.className = 'picom-section-title';
            title.textContent = this.config.title;
            container.appendChild(title);
        }
        
        // Subtitle
        if (this.config.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.className = 'picom-section-subtitle';
            subtitle.textContent = this.config.subtitle;
            container.appendChild(subtitle);
        }
        
        // Content
        if (this.config.content) {
            const content = document.createElement('div');
            content.className = 'picom-section-content';
            
            if (typeof this.config.content === 'string') {
                content.innerHTML = this.config.content;
            } else if (Array.isArray(this.config.content)) {
                // Handle array of components
                this.config.content.forEach(item => {
                    if (item.type && item.config) {
                        const component = this.createComponent(item.type, item.config);
                        if (component) {
                            content.appendChild(component.render());
                        }
                    }
                });
            }
            
            container.appendChild(content);
        }
        
        section.appendChild(container);
        
        // Store element reference
        this.element = section;
        
        return section;
    }
    
    createComponent(type, config) {
        switch (type) {
            case 'card':
                return new CardComponent(config);
            case 'button':
                return new ButtonComponent(config);
            case 'input':
                return new InputComponent(config);
            case 'checkbox':
                return new CheckboxComponent(config);
            case 'select':
                return new SelectComponent(config);
            default:
                console.warn('Unknown component type:', type);
                return null;
        }
    }
}


class CardComponent extends BaseComponent {
    constructor(config = {}) {
        super('card', config);
    }

    render() {
        const card = document.createElement('div');
        card.className = 'picom-card';
        
        // Card image
        if (this.config.image) {
            const image = document.createElement('div');
            image.className = 'picom-card-image';
            
            const img = document.createElement('img');
            img.src = this.config.image.src || this.config.image;
            img.alt = this.config.image.alt || 'Card image';
            
            image.appendChild(img);
            card.appendChild(image);
        }
        
        // Card content
        const content = document.createElement('div');
        content.className = 'picom-card-content';
        
        // Title
        if (this.config.title) {
            const title = document.createElement('h3');
            title.className = 'picom-card-title';
            title.textContent = this.config.title;
            content.appendChild(title);
        }
        
        // Description
        if (this.config.description) {
            const description = document.createElement('p');
            description.className = 'picom-card-description';
            description.textContent = this.config.description;
            content.appendChild(description);
        }
        
        // Buttons
        if (this.config.buttons && Array.isArray(this.config.buttons)) {
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'picom-card-buttons';
            
            this.config.buttons.forEach(btn => {
                const button = document.createElement('a');
                button.className = `picom-card-btn ${btn.variant || 'primary'}`;
                button.href = btn.href || '#';
                button.textContent = btn.text || 'Button';
                
                if (btn.onClick) {
                    this.addEventHandler(button, 'click', (e) => {
                        e.preventDefault();
                        btn.onClick();
                    });
                }
                
                buttonGroup.appendChild(button);
            });
            
            content.appendChild(buttonGroup);
        }
        
        card.appendChild(content);
        
        // Store element reference
        this.element = card;
        
        return card;
    }
}


class ButtonComponent extends BaseComponent {
    constructor(config = {}) {
        super('button', config);
    }

    render() {
        const button = document.createElement('button');
        button.textContent = this.config.text || 'Click Me';
        button.id = this.config.id || this.id;
        button.className = 'picom-button';
        
        // Store element reference
        this.element = button;
        
        // Add click handler with proper cleanup
        if (this.config.onClick) {
            this.addEventHandler(button, 'click', this.config.onClick);
        }
        
        return button;
    }

    onMounted() {
        // Component is now in the DOM
    }

    onBeforeDispose() {
        // Component is being disposed
    }
}


class InputComponent extends BaseComponent {
    constructor(config = {}) {
        super('input', config);
    }

    render() {
        // Create container
        const container = document.createElement('div');
        container.className = 'picom-textbox';
        
        // Create label
        const label = document.createElement('label');
        label.textContent = this.config.label || 'Label';
        label.className = 'picom-textbox-label';
        
        // Create input
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = this.config.placeholder || 'Enter text';
        input.id = this.config.id || this.id;
        input.className = 'picom-textbox-input';
        
        // Assemble
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
        container.appendChild(input);
        
        // Store element reference
        this.element = container;
        
        return container;
    }
}

class CheckboxComponent extends BaseComponent {
    constructor(config = {}) {
        super('checkbox', config);
    }

    render() {
        const container = document.createElement('div');
        container.className = 'picom-checkbox';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = this.config.id || this.id;
        input.className = 'picom-checkbox-input';
        input.checked = this.config.checked || false;
        
        const label = document.createElement('label');
        label.textContent = this.config.label || 'Checkbox';
        label.className = 'picom-checkbox-label';
        label.setAttribute('for', input.id);
        
        // Add change handler
        if (this.config.onChange) {
            this.addEventHandler(input, 'change', this.config.onChange);
        }
        
        container.appendChild(input);
        container.appendChild(label);
        
        // Store element reference
        this.element = container;
        
        return container;
    }
}

class SelectComponent extends BaseComponent {
    constructor(config = {}) {
        super('select', config);
    }

    render() {
        const container = document.createElement('div');
        container.className = 'picom-select';
        
        const label = document.createElement('label');
        label.textContent = this.config.label || 'Select';
        label.className = 'picom-select-label';
        
        const select = document.createElement('select');
        select.id = this.config.id || this.id;
        select.className = 'picom-select-input';
        
        // Add options
        if (this.config.options && Array.isArray(this.config.options)) {
            this.config.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.textContent = option;
                optionElement.value = option;
                select.appendChild(optionElement);
            });
        }
        
        // Add change handler
        if (this.config.onChange) {
            this.addEventHandler(select, 'change', this.config.onChange);
        }
        
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
        container.appendChild(select);
        
        // Store element reference
        this.element = container;
        
        return container;
    }
}

// Main drag-and-drop builder
class FormBuilder {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.components = [];
        this.init();
    }

    init() {
        this.createComponentPalette();
        // Delay drag and drop setup to ensure DOM is ready
        setTimeout(() => {
            this.setupDragAndDrop();
        }, 100);
    }

    createComponentPalette() {
        const palette = document.getElementById('component-palette');
        if (!palette) return;

        const components = [
            { type: 'input', label: 'Text Input', icon: '📝' },
            { type: 'button', label: 'Button', icon: '🔘' },
            { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
            { type: 'select', label: 'Select', icon: '📋' }
        ];

        components.forEach(comp => {
            const item = document.createElement('div');
            item.className = 'component-item';
            item.setAttribute('data-type', comp.type);
            item.innerHTML = `
                <span class="component-icon">${comp.icon}</span>
                <span class="component-label">${comp.label}</span>
            `;
            palette.appendChild(item);
        });
    }

    setupDragAndDrop() {
        const componentItems = $('.component-item');
        
        // Make component items draggable using jQuery UI
        componentItems.draggable({
            helper: 'clone',
            revert: 'invalid',
            cursor: 'move',
            start: function(event, ui) {
                // Drag started
            }
        });

        // Make form canvas droppable using jQuery UI
        const $container = $(this.container);
        
        $container.droppable({
            accept: '.component-item',
            activeClass: 'drag-over',
            hoverClass: 'ui-droppable-hover',
            drop: (event, ui) => {
                event.preventDefault();
                const componentType = ui.helper.attr('data-type') || ui.helper.data('type');
                this.addComponentToCanvas(componentType);
            }
        });
    }

    addComponentToCanvas(componentType) {
        let ComponentClass;
        const config = { id: `comp-${Date.now()}` };

        try {
            switch (componentType) {
                case 'input':
                    ComponentClass = InputComponent;
                    break;
                case 'button':
                    ComponentClass = ButtonComponent;
                    break;
                case 'checkbox':
                    ComponentClass = CheckboxComponent;
                    break;
                case 'select':
                    config.options = ['Option 1', 'Option 2', 'Option 3'];
                    ComponentClass = SelectComponent;
                    break;
                default:
                    return;
            }

            // Clear the placeholder text if it exists
            const placeholder = this.container.querySelector('p');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Use ComponentManager to render the component
            const componentData = window.ComponentManager.renderComponent(ComponentClass, this.container, { config });
            
            if (componentData) {
                // Add form component styling
                componentData.element.classList.add('form-component');
                
                // Store component reference
                this.components.push(componentData);
            }
        } catch (error) {
            // Error adding component
        }
    }

    getFormData() {
        const data = {};
        this.components.forEach(comp => {
            const element = document.getElementById(comp.id);
            if (element) {
                if (element.tagName === 'INPUT') {
                    if (element.type === 'checkbox') {
                        data[comp.id] = element.checked;
                    } else {
                        data[comp.id] = element.value;
                    }
                } else if (element.tagName === 'SELECT') {
                    data[comp.id] = element.value;
                }
            }
        });
        return data;
    }

    clearForm() {
        // Dispose all components using ComponentManager
        this.components.forEach(comp => {
            if (comp.dispose) {
                comp.dispose();
            }
        });
        
        // Clear the container
        this.container.innerHTML = '';
        this.components = [];
        
        // Add placeholder text back
        const placeholder = document.createElement('p');
        placeholder.style.textAlign = 'center';
        placeholder.style.color = '#888';
        placeholder.style.marginTop = '50px';
        placeholder.textContent = 'Drag components from the left panel to build your form';
        this.container.appendChild(placeholder);
    }
}

// Pre-built layout templates for easy use
const LayoutTemplates = {
    // Landing Page Template
    landing: {
        type: 'landing',
        navbar: {
            brand: {
                text: 'Your Brand',
                href: '#'
            },
            items: [
                { text: 'Home', href: '#', active: true },
                { text: 'About', href: '#about' },
                { text: 'Services', href: '#services' },
                { text: 'Contact', href: '#contact' }
            ],
            mobile: true
        },
        hero: {
            title: 'Welcome to Our Platform',
            subtitle: 'Build amazing things with our tools and services',
            buttons: [
                { text: 'Get Started', href: '#', variant: 'primary' },
                { text: 'Learn More', href: '#', variant: 'secondary' }
            ]
        },
        sections: [
            {
                title: 'Features',
                subtitle: 'What makes us special',
                className: 'light',
                content: [
                    {
                        type: 'card',
                        config: {
                            title: 'Feature 1',
                            description: 'Amazing feature description here',
                            buttons: [{ text: 'Learn More', href: '#', variant: 'outline' }]
                        }
                    },
                    {
                        type: 'card',
                        config: {
                            title: 'Feature 2',
                            description: 'Another great feature',
                            buttons: [{ text: 'Learn More', href: '#', variant: 'outline' }]
                        }
                    },
                    {
                        type: 'card',
                        config: {
                            title: 'Feature 3',
                            description: 'Third amazing feature',
                            buttons: [{ text: 'Learn More', href: '#', variant: 'outline' }]
                        }
                    }
                ]
            }
        ],
        footer: {
            text: '© 2024 Your Company. All rights reserved.',
            links: [
                { text: 'Privacy Policy', href: '#' },
                { text: 'Terms of Service', href: '#' },
                { text: 'Contact', href: '#' }
            ]
        }
    },

    // Dashboard Template
    dashboard: {
        type: 'dashboard',
        sidebar: {
            title: 'Dashboard',
            items: [
                { text: 'Overview', href: '#', active: true },
                { text: 'Analytics', href: '#' },
                { text: 'Users', href: '#' },
                { text: 'Settings', href: '#' },
                { text: 'Reports', href: '#' }
            ]
        },
        topbar: {
            title: 'Dashboard Overview',
            actions: [
                { text: 'Export', onClick: () => alert('Export clicked') },
                { text: 'Settings', onClick: () => alert('Settings clicked') }
            ]
        },
        content: [
            {
                type: 'card',
                config: {
                    title: 'Welcome to Dashboard',
                    description: 'Manage your data and analytics from here',
                    buttons: [
                        { text: 'View Reports', href: '#', variant: 'primary' }
                    ]
                }
            }
        ]
    },

    // Blog Template
    blog: {
        type: 'blog',
        header: {
            title: 'My Blog',
            subtitle: 'Thoughts and insights'
        },
        content: [
            {
                type: 'card',
                config: {
                    title: 'Blog Post Title',
                    description: 'This is a sample blog post content...',
                    buttons: [
                        { text: 'Read More', href: '#', variant: 'outline' }
                    ]
                }
            }
        ],
        sidebar: {
            title: 'Recent Posts',
            items: [
                { text: 'Post 1', href: '#' },
                { text: 'Post 2', href: '#' },
                { text: 'Post 3', href: '#' }
            ]
        },
        footer: {
            text: '© 2024 My Blog',
            links: [
                { text: 'About', href: '#' },
                { text: 'Contact', href: '#' }
            ]
        }
    },

    // Portfolio Template
    portfolio: {
        type: 'portfolio',
        navbar: {
            brand: {
                text: 'Portfolio',
                href: '#'
            },
            items: [
                { text: 'Home', href: '#', active: true },
                { text: 'About', href: '#about' },
                { text: 'Work', href: '#work' },
                { text: 'Contact', href: '#contact' }
            ]
        },
        hero: {
            title: 'Creative Portfolio',
            subtitle: 'Showcasing amazing work and projects',
            buttons: [
                { text: 'View Work', href: '#work', variant: 'primary' }
            ]
        },
        portfolio: {
            title: 'Featured Work',
            items: [
                {
                    title: 'Project 1',
                    description: 'Amazing project description',
                    image: 'https://via.placeholder.com/400x300'
                },
                {
                    title: 'Project 2',
                    description: 'Another great project',
                    image: 'https://via.placeholder.com/400x300'
                },
                {
                    title: 'Project 3',
                    description: 'Third awesome project',
                    image: 'https://via.placeholder.com/400x300'
                }
            ]
        },
        footer: {
            text: '© 2024 Portfolio',
            links: [
                { text: 'LinkedIn', href: '#' },
                { text: 'GitHub', href: '#' },
                { text: 'Email', href: '#' }
            ]
        }
    },

    // Minimal Template
    minimal: {
        type: 'minimal',
        header: {
            title: 'Simple & Clean',
            subtitle: 'Minimal design for maximum impact'
        },
        content: [
            {
                type: 'card',
                config: {
                    title: 'Welcome',
                    description: 'This is a minimal layout example',
                    buttons: [
                        { text: 'Get Started', href: '#', variant: 'primary' }
                    ]
                }
            }
        ]
    },

    // Sidebar Template
    sidebar: {
        type: 'sidebar',
        sidebar: {
            title: 'Navigation',
            items: [
                { text: 'Home', href: '#', active: true },
                { text: 'About', href: '#' },
                { text: 'Services', href: '#' },
                { text: 'Portfolio', href: '#' },
                { text: 'Contact', href: '#' }
            ]
        },
        content: [
            {
                type: 'card',
                config: {
                    title: 'Main Content',
                    description: 'This is the main content area with sidebar navigation',
                    buttons: [
                        { text: 'Learn More', href: '#', variant: 'outline' }
                    ]
                }
            }
        ]
    },

    // Grid Template
    grid: {
        type: 'grid',
        header: {
            title: 'Grid Layout',
            subtitle: 'Organized in a clean grid structure'
        },
        grid: [
            {
                type: 'card',
                config: {
                    title: 'Grid Item 1',
                    description: 'First grid item content',
                    buttons: [{ text: 'Action', href: '#', variant: 'outline' }]
                }
            },
            {
                type: 'card',
                config: {
                    title: 'Grid Item 2',
                    description: 'Second grid item content',
                    buttons: [{ text: 'Action', href: '#', variant: 'outline' }]
                }
            },
            {
                type: 'card',
                config: {
                    title: 'Grid Item 3',
                    description: 'Third grid item content',
                    buttons: [{ text: 'Action', href: '#', variant: 'outline' }]
                }
            },
            {
                type: 'card',
                config: {
                    title: 'Grid Item 4',
                    description: 'Fourth grid item content',
                    buttons: [{ text: 'Action', href: '#', variant: 'outline' }]
                }
            }
        ],
        footer: {
            text: '© 2024 Grid Layout',
            links: [
                { text: 'Home', href: '#' },
                { text: 'About', href: '#' }
            ]
        }
    }
};

// Helper function to get layout template
function getLayoutTemplate(templateName) {
    return LayoutTemplates[templateName] || LayoutTemplates.landing;
}

// Helper function to list available templates
function getAvailableTemplates() {
    return Object.keys(LayoutTemplates);
}

// Helper function to create custom layout
function createCustomLayout(config) {
    return {
        type: config.type || 'default',
        ...config
    };
}


