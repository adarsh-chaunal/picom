// TypeScript Usage Example for Picom UI Library

import { 
  InputComponent, 
  ButtonComponent, 
  ComponentManager,
  InputConfig,
  ButtonConfig 
} from '../src/index';

// Example 1: Basic component usage
function createBasicForm(): void {
  const container = document.getElementById('form-container');
  if (!container) return;

  // Create input component with TypeScript types
  const inputConfig: InputConfig = {
    id: 'username-input',
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    required: true,
    onChange: (event: Event) => {
      const target = event.target as HTMLInputElement;
      console.log('Input changed:', target.value);
    }
  };

  const inputComponent = new InputComponent(inputConfig);
  const inputElement = inputComponent.render();
  container.appendChild(inputElement);

  // Create button component with TypeScript types
  const buttonConfig: ButtonConfig = {
    id: 'submit-btn',
    text: 'Submit',
    type: 'submit',
    variant: 'primary',
    onClick: (event: MouseEvent) => {
      console.log('Button clicked!');
      const username = inputComponent.getValue();
      console.log('Username:', username);
    }
  };

  const buttonComponent = new ButtonComponent(buttonConfig);
  const buttonElement = buttonComponent.render();
  container.appendChild(buttonElement);
}

// Example 2: Using ComponentManager for lifecycle management
function createManagedForm(): void {
  const container = document.getElementById('managed-form');
  if (!container) return;

  // Use ComponentManager for automatic lifecycle management
  const inputData = ComponentManager.renderComponent(InputComponent, container, {
    config: {
      id: 'email-input',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true
    }
  });

  const buttonData = ComponentManager.renderComponent(ButtonComponent, container, {
    config: {
      id: 'send-btn',
      text: 'Send Email',
      variant: 'primary',
      onClick: () => {
        console.log('Email sent!');
      }
    }
  });

  // Components are automatically tracked and can be disposed
  setTimeout(() => {
    if (inputData) {
      inputData.dispose();
      console.log('Input component disposed');
    }
  }, 5000);
}

// Example 3: Advanced component configuration
function createAdvancedForm(): void {
  const container = document.getElementById('advanced-form');
  if (!container) return;

  // Create multiple inputs with different configurations
  const inputs: InputConfig[] = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 50
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      minLength: 1,
      maxLength: 3
    },
    {
      id: 'website',
      label: 'Website',
      type: 'url',
      placeholder: 'https://example.com'
    }
  ];

  inputs.forEach((config, index) => {
    const component = new InputComponent(config);
    const element = component.render();
    container.appendChild(element);
  });

  // Create action buttons
  const buttons: ButtonConfig[] = [
    {
      id: 'save-btn',
      text: 'Save',
      variant: 'primary',
      onClick: () => console.log('Saved!')
    },
    {
      id: 'cancel-btn',
      text: 'Cancel',
      variant: 'secondary',
      onClick: () => console.log('Cancelled!')
    }
  ];

  buttons.forEach((config) => {
    const component = new ButtonComponent(config);
    const element = component.render();
    container.appendChild(element);
  });
}

// Example 4: Form validation and data collection
function createValidatedForm(): void {
  const container = document.getElementById('validated-form');
  if (!container) return;

  const components: { [key: string]: InputComponent } = {};

  // Create form fields
  const fields = [
    { id: 'firstName', label: 'First Name', required: true },
    { id: 'lastName', label: 'Last Name', required: true },
    { id: 'email', label: 'Email', type: 'email' as const, required: true },
    { id: 'phone', label: 'Phone', type: 'tel' as const }
  ];

  fields.forEach(field => {
    const component = new InputComponent({
      id: field.id,
      label: field.label,
      type: field.type || 'text',
      required: field.required
    });
    
    components[field.id] = component;
    container.appendChild(component.render());
  });

  // Create submit button
  const submitButton = new ButtonComponent({
    id: 'validate-submit',
    text: 'Submit Form',
    type: 'submit',
    variant: 'primary',
    onClick: () => {
      // Validate all fields
      const isValid = Object.values(components).every(comp => comp.isValid());
      
      if (isValid) {
        // Collect form data
        const formData: { [key: string]: string } = {};
        Object.entries(components).forEach(([key, comp]) => {
          formData[key] = comp.getValue();
        });
        
        console.log('Form data:', formData);
        alert('Form submitted successfully!');
      } else {
        alert('Please fill in all required fields correctly.');
      }
    }
  });

  container.appendChild(submitButton.render());
}

// Initialize examples when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  createBasicForm();
  createManagedForm();
  createAdvancedForm();
  createValidatedForm();
});

// Export for module usage
export {
  createBasicForm,
  createManagedForm,
  createAdvancedForm,
  createValidatedForm
};
