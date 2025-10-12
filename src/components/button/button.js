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
