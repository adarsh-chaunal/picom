// Main drag-and-drop builder
class FormBuilder {
    constructor(containerId) {
        this.container = $(`#${containerId}`);
        this.components = [];
        this.init();
    }

    init() {
        this.createComponentPalette();
        this.setupDragAndDrop();
    }

    createComponentPalette() {
        const palette = $('#component-palette');
        if (palette.length === 0) return;

        const components = [
            { type: 'input', label: 'Text Input', icon: '📝' },
            { type: 'button', label: 'Button', icon: '🔘' },
            { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
            { type: 'select', label: 'Select', icon: '📋' }
        ];

        components.forEach(comp => {
            const $item = $(`<div class="component-item" data-type="${comp.type}">
                <span class="component-icon">${comp.icon}</span>
                <span class="component-label">${comp.label}</span>
            </div>`);
            palette.append($item);
        });
    }

    setupDragAndDrop() {
        // Make component items draggable
        $('.component-item').draggable({
            helper: 'clone',
            revert: 'invalid',
            cursor: 'move',
            start: function(event, ui) {
                console.log('Drag started:', $(this).data('type'));
            }
        });

        // Make form canvas droppable
        this.container.droppable({
            accept: '.component-item',
            activeClass: 'drag-over',
            drop: (event, ui) => {
                event.preventDefault();
                const componentType = ui.helper.attr('data-type') || ui.helper.data('type');
                console.log('Dropped component type:', componentType);
                this.addComponentToCanvas(componentType);
            }
        });
    }

    addComponentToCanvas(componentType) {
        console.log('Adding component to canvas:', componentType);
        let component;
        const config = { id: `comp-${Date.now()}` };

        try {
            switch (componentType) {
                case 'input':
                    component = new InputComponent(config);
                    break;
                case 'button':
                    component = new ButtonComponent(config);
                    break;
                case 'checkbox':
                    component = new CheckboxComponent(config);
                    break;
                case 'select':
                    config.options = ['Option 1', 'Option 2', 'Option 3'];
                    component = new SelectComponent(config);
                    break;
                default:
                    console.warn('Unknown component type:', componentType);
                    return;
            }

            const $rendered = component.render();
            $rendered.addClass('form-component');
            
            // Clear the placeholder text if it exists
            this.container.find('p').remove();
            
            this.container.append($rendered);
            this.components.push(component);
            
            console.log('Component added successfully:', componentType);
        } catch (error) {
            console.error('Error adding component:', error);
        }
    }

    getFormData() {
        const data = {};
        this.components.forEach(comp => {
            const $element = $(`#${comp.id}`);
            if ($element.is('input')) {
                data[comp.id] = $element.val();
            } else if ($element.is('select')) {
                data[comp.id] = $element.val();
            } else if ($element.is('input[type="checkbox"]')) {
                data[comp.id] = $element.is(':checked');
            }
        });
        return data;
    }

    clearForm() {
        this.container.empty();
        this.components = [];
        
        // Add placeholder text back
        this.container.append('<p style="text-align: center; color: #888; margin-top: 50px;">Drag components from the left panel to build your form</p>');
    }
}