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
