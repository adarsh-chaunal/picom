import { BaseComponent } from '../../core/BaseComponent';
import type { ButtonConfig } from '../../types/components';

/**
 * Button component for interactive buttons
 */
export class ButtonComponent extends BaseComponent {
  private buttonConfig: ButtonConfig;

  constructor(config: ButtonConfig) {
    super('button', config);
    this.buttonConfig = config;
  }

  public render(): HTMLElement {
    const button = document.createElement('button');
    button.textContent = this.buttonConfig.text;
    button.id = this.buttonConfig.id || this.id;
    button.className = this.getButtonClasses();
    button.type = this.buttonConfig.type || 'button';
    
    // Set attributes
    if (this.buttonConfig.disabled) button.disabled = true;
    
    // Add event handlers
    if (this.buttonConfig.onClick) {
      this.addEventHandler(button, 'click', this.buttonConfig.onClick);
    }
    if (this.buttonConfig.onFocus) {
      this.addEventHandler(button, 'focus', this.buttonConfig.onFocus);
    }
    if (this.buttonConfig.onBlur) {
      this.addEventHandler(button, 'blur', this.buttonConfig.onBlur);
    }
    
    // Store element reference
    this.element = button;
    
    return button;
  }

  /**
   * Get CSS classes for the button
   */
  private getButtonClasses(): string {
    const classes = ['picom-button'];
    
    if (this.buttonConfig.variant) {
      classes.push(`picom-button-${this.buttonConfig.variant}`);
    }
    
    if (this.buttonConfig.size) {
      classes.push(`picom-button-${this.buttonConfig.size}`);
    }
    
    if (this.buttonConfig.className) {
      classes.push(this.buttonConfig.className);
    }
    
    return classes.join(' ');
  }

  /**
   * Set button text
   */
  public setText(text: string): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  /**
   * Get button text
   */
  public getText(): string {
    return this.element?.textContent || '';
  }

  /**
   * Enable the button
   */
  public enable(): void {
    if (this.element) {
      (this.element as HTMLButtonElement).disabled = false;
    }
  }

  /**
   * Disable the button
   */
  public disable(): void {
    if (this.element) {
      (this.element as HTMLButtonElement).disabled = true;
    }
  }

  /**
   * Focus the button
   */
  public focus(): void {
    this.element?.focus();
  }

  /**
   * Click the button programmatically
   */
  public click(): void {
    (this.element as HTMLButtonElement)?.click();
  }
}
