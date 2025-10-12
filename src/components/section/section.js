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
