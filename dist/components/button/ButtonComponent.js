import { BaseComponent } from '../../core/BaseComponent';
/**
 * Button component for interactive buttons
 */
export class ButtonComponent extends BaseComponent {
    constructor(config) {
        super('button', config);
        this.buttonConfig = config;
    }
    render() {
        const button = document.createElement('button');
        button.textContent = this.buttonConfig.text;
        button.id = this.buttonConfig.id || this.id;
        button.className = this.getButtonClasses();
        button.type = this.buttonConfig.type || 'button';
        // Set attributes
        if (this.buttonConfig.disabled)
            button.disabled = true;
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
    getButtonClasses() {
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
    setText(text) {
        if (this.element) {
            this.element.textContent = text;
        }
    }
    /**
     * Get button text
     */
    getText() {
        return this.element?.textContent || '';
    }
    /**
     * Enable the button
     */
    enable() {
        if (this.element) {
            this.element.disabled = false;
        }
    }
    /**
     * Disable the button
     */
    disable() {
        if (this.element) {
            this.element.disabled = true;
        }
    }
    /**
     * Focus the button
     */
    focus() {
        this.element?.focus();
    }
    /**
     * Click the button programmatically
     */
    click() {
        this.element?.click();
    }
}
//# sourceMappingURL=ButtonComponent.js.map