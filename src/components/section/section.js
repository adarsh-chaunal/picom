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
