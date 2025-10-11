class ButtonComponent extends BaseComponent {
    constructor(config = {}) {
        super('button', config);
    }

    render() {
        const $btn = createElement('button', 'ui-button', this.config.text || 'Click Me');
        $btn.attr('id', this.id);
        
        // Store element reference
        this.element = $btn;
        
        // Add click handler with proper cleanup
        if (this.config.onClick) {
            this.addEventHandler($btn, 'click', this.config.onClick);
        }
        
        return $btn;
    }

    onMounted() {
        // Component is now in the DOM
    }

    onBeforeDispose() {
        // Component is being disposed
    }
}
