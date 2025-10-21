import { BaseComponent } from '../../core/BaseComponent';
import type { InputConfig } from '../../types/components';

/**
 * Input component for text input fields
 */
export class InputComponent extends BaseComponent {
  private inputConfig: InputConfig;

  constructor(config: InputConfig = {}) {
    super('input', config);
    this.inputConfig = config;
  }

  public render(): HTMLElement {
    // Create container
    const container = document.createElement('div');
    container.className = 'picom-textbox';
    
    // Create label
    const label = document.createElement('label');
    label.textContent = this.inputConfig.label || 'Label';
    label.className = 'picom-textbox-label';
    
    // Create input
    const input = document.createElement('input');
    input.type = this.inputConfig.type || 'text';
    input.placeholder = this.inputConfig.placeholder || 'Enter text...';
    input.id = this.inputConfig.id || this.id;
    input.className = 'picom-textbox-input';
    input.value = this.inputConfig.value || '';
    
    // Set attributes
    if (this.inputConfig.required) input.required = true;
    if (this.inputConfig.maxLength) input.maxLength = this.inputConfig.maxLength;
    if (this.inputConfig.minLength) input.minLength = this.inputConfig.minLength;
    if (this.inputConfig.pattern) input.pattern = this.inputConfig.pattern;
    if (this.inputConfig.disabled) input.disabled = true;
    
    // Add event handlers
    if (this.inputConfig.onChange) {
      this.addEventHandler(input, 'change', this.inputConfig.onChange);
    }
    if (this.inputConfig.onFocus) {
      this.addEventHandler(input, 'focus', this.inputConfig.onFocus);
    }
    if (this.inputConfig.onBlur) {
      this.addEventHandler(input, 'blur', this.inputConfig.onBlur);
    }
    
    // Assemble
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
    container.appendChild(input);
    
    // Store element reference
    this.element = container;
    
    return container;
  }

  /**
   * Get the current input value
   */
  public getValue(): string {
    const input = this.element?.querySelector('input') as HTMLInputElement;
    return input?.value || '';
  }

  /**
   * Set the input value
   */
  public setValue(value: string): void {
    const input = this.element?.querySelector('input') as HTMLInputElement;
    if (input) {
      input.value = value;
    }
  }

  /**
   * Focus the input
   */
  public focus(): void {
    const input = this.element?.querySelector('input') as HTMLInputElement;
    input?.focus();
  }

  /**
   * Blur the input
   */
  public blur(): void {
    const input = this.element?.querySelector('input') as HTMLInputElement;
    input?.blur();
  }

  /**
   * Check if the input is valid
   */
  public isValid(): boolean {
    const input = this.element?.querySelector('input') as HTMLInputElement;
    return input?.checkValidity() ?? true;
  }
}
