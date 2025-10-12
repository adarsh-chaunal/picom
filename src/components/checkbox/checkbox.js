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