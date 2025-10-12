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