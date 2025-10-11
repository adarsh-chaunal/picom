// Common utilities and base classes


class BaseComponent {
    constructor(type, config = {}) {
        this.type = type;
        this.config = config;
        this.id = config.id || `comp-${Math.random().toString(36).substr(2, 9)}`;
    }

    render() {
        throw new Error('Render method not implemented');
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


// DOM helpers

function createElement(tag, className, text) {
    const $el = $(`<${tag}>`);
    if (className) $el.addClass(className);
    if (text) $el.text(text);
    return $el;
}


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
        const $layout = createElement('div', 'ui-layout default-layout');
        
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
        const $navbar = createElement('nav', 'ui-navbar');
        
        // Brand/Logo
        if (this.config.brand) {
            const $brand = createElement('div', 'navbar-brand');
            if (this.config.brand.logo) {
                const $logo = createElement('img', 'navbar-logo');
                $logo.attr('src', this.config.brand.logo);
                $logo.attr('alt', this.config.brand.text || 'Logo');
                $brand.append($logo);
            }
            if (this.config.brand.text) {
                const $brandText = createElement('span', 'navbar-brand-text', this.config.brand.text);
                $brand.append($brandText);
            }
            if (this.config.brand.href) {
                const $brandLink = createElement('a', 'navbar-brand-link');
                $brandLink.attr('href', this.config.brand.href);
                $brandLink.append($brand);
                $navbar.append($brandLink);
            } else {
                $navbar.append($brand);
            }
        }

        // Navigation Items
        if (this.config.items && Array.isArray(this.config.items)) {
            const $navItems = createElement('div', 'navbar-items');
            
            this.config.items.forEach(item => {
                const $navItem = createElement('a', 'navbar-item');
                $navItem.attr('href', item.href || '#');
                $navItem.text(item.text || 'Link');
                
                if (item.active) {
                    $navItem.addClass('active');
                }
                
                if (item.onClick) {
                    $navItem.on('click', (e) => {
                        e.preventDefault();
                        item.onClick();
                    });
                }
                
                $navItems.append($navItem);
            });
            
            $navbar.append($navItems);
        }

        // Mobile menu toggle
        if (this.config.mobile) {
            const $mobileToggle = createElement('button', 'navbar-mobile-toggle');
            $mobileToggle.html('☰');
            $mobileToggle.on('click', () => {
                $navbar.toggleClass('mobile-open');
            });
            $navbar.append($mobileToggle);
        }

        return $navbar;
    }
}


class HeroComponent extends BaseComponent {
    constructor(config = {}) {
        super('hero', config);
    }

    render() {
        const $hero = createElement('section', 'ui-hero');
        
        // Background image
        if (this.config.background) {
            $hero.css('background-image', `url(${this.config.background})`);
        }
        
        // Content container
        const $container = createElement('div', 'hero-container');
        
        // Title
        if (this.config.title) {
            const $title = createElement('h1', 'hero-title', this.config.title);
            $container.append($title);
        }
        
        // Subtitle
        if (this.config.subtitle) {
            const $subtitle = createElement('p', 'hero-subtitle', this.config.subtitle);
            $container.append($subtitle);
        }
        
        // Buttons
        if (this.config.buttons && Array.isArray(this.config.buttons)) {
            const $buttonGroup = createElement('div', 'hero-buttons');
            
            this.config.buttons.forEach(btn => {
                const $button = createElement('a', `hero-btn ${btn.variant || 'primary'}`);
                $button.attr('href', btn.href || '#');
                $button.text(btn.text || 'Button');
                
                if (btn.onClick) {
                    $button.on('click', (e) => {
                        e.preventDefault();
                        btn.onClick();
                    });
                }
                
                $buttonGroup.append($button);
            });
            
            $container.append($buttonGroup);
        }
        
        $hero.append($container);
        return $hero;
    }
}


class SectionComponent extends BaseComponent {
    constructor(config = {}) {
        super('section', config);
    }

    render() {
        const $section = createElement('section', 'ui-section');
        
        // Add custom classes
        if (this.config.className) {
            $section.addClass(this.config.className);
        }
        
        // Background styling
        if (this.config.background) {
            if (this.config.background.color) {
                $section.css('background-color', this.config.background.color);
            }
            if (this.config.background.image) {
                $section.css('background-image', `url(${this.config.background.image})`);
                $section.css('background-size', 'cover');
                $section.css('background-position', 'center');
            }
        }
        
        // Container
        const $container = createElement('div', 'section-container');
        
        // Title
        if (this.config.title) {
            const $title = createElement('h2', 'section-title', this.config.title);
            $container.append($title);
        }
        
        // Subtitle
        if (this.config.subtitle) {
            const $subtitle = createElement('p', 'section-subtitle', this.config.subtitle);
            $container.append($subtitle);
        }
        
        // Content
        if (this.config.content) {
            const $content = createElement('div', 'section-content');
            
            if (typeof this.config.content === 'string') {
                $content.html(this.config.content);
            } else if (Array.isArray(this.config.content)) {
                // Handle array of components
                this.config.content.forEach(item => {
                    if (item.type && item.config) {
                        const component = this.createComponent(item.type, item.config);
                        if (component) {
                            $content.append(component.render());
                        }
                    }
                });
            }
            
            $container.append($content);
        }
        
        $section.append($container);
        return $section;
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
        const $card = createElement('div', 'ui-card');
        
        // Card image
        if (this.config.image) {
            const $image = createElement('div', 'card-image');
            const $img = createElement('img');
            $img.attr('src', this.config.image.src || this.config.image);
            $img.attr('alt', this.config.image.alt || 'Card image');
            $image.append($img);
            $card.append($image);
        }
        
        // Card content
        const $content = createElement('div', 'card-content');
        
        // Title
        if (this.config.title) {
            const $title = createElement('h3', 'card-title', this.config.title);
            $content.append($title);
        }
        
        // Description
        if (this.config.description) {
            const $description = createElement('p', 'card-description', this.config.description);
            $content.append($description);
        }
        
        // Buttons
        if (this.config.buttons && Array.isArray(this.config.buttons)) {
            const $buttonGroup = createElement('div', 'card-buttons');
            
            this.config.buttons.forEach(btn => {
                const $button = createElement('a', `card-btn ${btn.variant || 'primary'}`);
                $button.attr('href', btn.href || '#');
                $button.text(btn.text || 'Button');
                
                if (btn.onClick) {
                    $button.on('click', (e) => {
                        e.preventDefault();
                        btn.onClick();
                    });
                }
                
                $buttonGroup.append($button);
            });
            
            $content.append($buttonGroup);
        }
        
        $card.append($content);
        return $card;
    }
}


class ButtonComponent extends BaseComponent {
    constructor(config = {}) {
        super('button', config);
    }

    render() {
        const $btn = createElement('button', 'ui-button', this.config.text || 'Click Me');
        $btn.attr('id', this.id);
        if (this.config.onClick) $btn.on('click', this.config.onClick);
        return $btn;
    }
}


class InputComponent extends BaseComponent {
    constructor(config = {}) {
        super('input', config);
    }

    render() {
        const $container = createElement('div', 'ui-input');
        const $label = createElement('label', '', this.config.label || 'Label');
        const $input = $('<input type="text">')
            .attr('placeholder', this.config.placeholder || 'Enter text')
            .attr('id', this.id);

        $container.append($label).append('<br>').append($input);
        return $container;
    }
}

//(function ($) {
//    $.fn.inputComponent = function (config) {
//        const $input = $('<input type="text" class="ui-input">')
//            .attr('placeholder', config.placeholder || 'Ender text');

//        if (config.label) {
//            const $label = $('<label>').text(config.label);

//            this.append($label).append($input);
//        }
//        else {
//            this.append($input);
//        }

//        return this;
//    };
//})(jQuery)


class CheckboxComponent extends BaseComponent {
    constructor(config = {}) {
        super('checkbox', config);
    }

    render() {
        const $container = createElement('div', 'ui-checkbox');
        const $label = createElement('label', '', this.config.label || 'Checkbox');
        const $input = $('<input type="checkbox">')
            .attr('id', this.id)
            .prop('checked', this.config.checked || false);

        if (this.config.onChange) {
            $input.on('change', this.config.onChange);
        }

        $container.append($input).append(' ').append($label);
        return $container;
    }
}

class SelectComponent extends BaseComponent {
    constructor(config = {}) {
        super('select', config);
    }

    render() {
        const $container = createElement('div', 'ui-select');
        const $label = createElement('label', '', this.config.label || 'Select');
        const $select = $('<select>').attr('id', this.id);

        if (this.config.options && Array.isArray(this.config.options)) {
            this.config.options.forEach(option => {
                const $option = $('<option>').text(option).val(option);
                $select.append($option);
            });
        }

        if (this.config.onChange) {
            $select.on('change', this.config.onChange);
        }

        $container.append($label).append('<br>').append($select);
        return $container;
    }
}

// Main drag-and-drop builder
class FormBuilder {
    constructor(containerId) {
        this.container = $(`#${containerId}`);
        this.components = [];
        this.init();
    }

    init() {
        this.createComponentPalette();
        this.setupDragAndDrop();
    }

    createComponentPalette() {
        const palette = $('#component-palette');
        if (palette.length === 0) return;

        const components = [
            { type: 'input', label: 'Text Input', icon: '📝' },
            { type: 'button', label: 'Button', icon: '🔘' },
            { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
            { type: 'select', label: 'Select', icon: '📋' }
        ];

        components.forEach(comp => {
            const $item = $(`<div class="component-item" data-type="${comp.type}">
                <span class="component-icon">${comp.icon}</span>
                <span class="component-label">${comp.label}</span>
            </div>`);
            palette.append($item);
        });
    }

    setupDragAndDrop() {
        // Make component items draggable
        $('.component-item').draggable({
            helper: 'clone',
            revert: 'invalid',
            cursor: 'move',
            start: function(event, ui) {
                console.log('Drag started:', $(this).data('type'));
            }
        });

        // Make form canvas droppable
        this.container.droppable({
            accept: '.component-item',
            activeClass: 'drag-over',
            drop: (event, ui) => {
                event.preventDefault();
                const componentType = ui.helper.attr('data-type') || ui.helper.data('type');
                console.log('Dropped component type:', componentType);
                this.addComponentToCanvas(componentType);
            }
        });
    }

    addComponentToCanvas(componentType) {
        console.log('Adding component to canvas:', componentType);
        let component;
        const config = { id: `comp-${Date.now()}` };

        try {
            switch (componentType) {
                case 'input':
                    component = new InputComponent(config);
                    break;
                case 'button':
                    component = new ButtonComponent(config);
                    break;
                case 'checkbox':
                    component = new CheckboxComponent(config);
                    break;
                case 'select':
                    config.options = ['Option 1', 'Option 2', 'Option 3'];
                    component = new SelectComponent(config);
                    break;
                default:
                    console.warn('Unknown component type:', componentType);
                    return;
            }

            const $rendered = component.render();
            $rendered.addClass('form-component');
            
            // Clear the placeholder text if it exists
            this.container.find('p').remove();
            
            this.container.append($rendered);
            this.components.push(component);
            
            console.log('Component added successfully:', componentType);
        } catch (error) {
            console.error('Error adding component:', error);
        }
    }

    getFormData() {
        const data = {};
        this.components.forEach(comp => {
            const $element = $(`#${comp.id}`);
            if ($element.is('input')) {
                data[comp.id] = $element.val();
            } else if ($element.is('select')) {
                data[comp.id] = $element.val();
            } else if ($element.is('input[type="checkbox"]')) {
                data[comp.id] = $element.is(':checked');
            }
        });
        return data;
    }

    clearForm() {
        this.container.empty();
        this.components = [];
        
        // Add placeholder text back
        this.container.append('<p style="text-align: center; color: #888; margin-top: 50px;">Drag components from the left panel to build your form</p>');
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
                { text: 'Export', onClick: () => console.log('Export clicked') },
                { text: 'Settings', onClick: () => console.log('Settings clicked') }
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


