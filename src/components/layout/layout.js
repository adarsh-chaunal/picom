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
