// Main drag-and-drop builder
class FormBuilder {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.components = [];
        this.init();
    }

    init() {
        this.createComponentPalette();
        // Delay drag and drop setup to ensure DOM is ready
        setTimeout(() => {
            this.setupDragAndDrop();
        }, 100);
    }

    createComponentPalette() {
        const palette = document.getElementById('component-palette');
        if (!palette) return;

        const components = [
            { type: 'input', label: 'Text Input', icon: '📝' },
            { type: 'button', label: 'Button', icon: '🔘' },
            { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
            { type: 'select', label: 'Select', icon: '📋' }
        ];

        components.forEach(comp => {
            const item = document.createElement('div');
            item.className = 'component-item';
            item.setAttribute('data-type', comp.type);
            item.innerHTML = `
                <span class="component-icon">${comp.icon}</span>
                <span class="component-label">${comp.label}</span>
            `;
            palette.appendChild(item);
        });
    }

    setupDragAndDrop() {
        const componentItems = $('.component-item');
        
        // Make component items draggable using jQuery UI
        componentItems.draggable({
            helper: 'clone',
            revert: 'invalid',
            cursor: 'move',
            start: function(event, ui) {
                // Drag started
            }
        });

        // Make form canvas droppable using jQuery UI
        const $container = $(this.container);
        
        $container.droppable({
            accept: '.component-item',
            activeClass: 'drag-over',
            hoverClass: 'ui-droppable-hover',
            drop: (event, ui) => {
                event.preventDefault();
                const componentType = ui.helper.attr('data-type') || ui.helper.data('type');
                this.addComponentToCanvas(componentType);
            }
        });
    }

    addComponentToCanvas(componentType) {
        let ComponentClass;
        const config = { id: `comp-${Date.now()}` };

        try {
            switch (componentType) {
                case 'input':
                    ComponentClass = InputComponent;
                    break;
                case 'button':
                    ComponentClass = ButtonComponent;
                    break;
                case 'checkbox':
                    ComponentClass = CheckboxComponent;
                    break;
                case 'select':
                    config.options = ['Option 1', 'Option 2', 'Option 3'];
                    ComponentClass = SelectComponent;
                    break;
                default:
                    return;
            }

            // Clear the placeholder text if it exists
            const placeholder = this.container.querySelector('p');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Use ComponentManager to render the component
            const componentData = window.ComponentManager.renderComponent(ComponentClass, this.container, { config });
            
            if (componentData) {
                // Add form component styling
                componentData.element.classList.add('form-component');
                
                // Store component reference
                this.components.push(componentData);
            }
        } catch (error) {
            // Error adding component
        }
    }

    getFormData() {
        const data = {};
        this.components.forEach(comp => {
            const element = document.getElementById(comp.id);
            if (element) {
                if (element.tagName === 'INPUT') {
                    if (element.type === 'checkbox') {
                        data[comp.id] = element.checked;
                    } else {
                        data[comp.id] = element.value;
                    }
                } else if (element.tagName === 'SELECT') {
                    data[comp.id] = element.value;
                }
            }
        });
        return data;
    }

    clearForm() {
        // Dispose all components using ComponentManager
        this.components.forEach(comp => {
            if (comp.dispose) {
                comp.dispose();
            }
        });
        
        // Clear the container
        this.container.innerHTML = '';
        this.components = [];
        
        // Add placeholder text back
        const placeholder = document.createElement('p');
        placeholder.style.textAlign = 'center';
        placeholder.style.color = '#888';
        placeholder.style.marginTop = '50px';
        placeholder.textContent = 'Drag components from the left panel to build your form';
        this.container.appendChild(placeholder);
    }
}