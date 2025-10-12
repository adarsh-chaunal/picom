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