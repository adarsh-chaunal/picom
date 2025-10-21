import { BaseComponent } from '../../core/BaseComponent';
import type { ButtonConfig } from '../../types/components';
/**
 * Button component for interactive buttons
 */
export declare class ButtonComponent extends BaseComponent {
    private buttonConfig;
    constructor(config: ButtonConfig);
    render(): HTMLElement;
    /**
     * Get CSS classes for the button
     */
    private getButtonClasses;
    /**
     * Set button text
     */
    setText(text: string): void;
    /**
     * Get button text
     */
    getText(): string;
    /**
     * Enable the button
     */
    enable(): void;
    /**
     * Disable the button
     */
    disable(): void;
    /**
     * Focus the button
     */
    focus(): void;
    /**
     * Click the button programmatically
     */
    click(): void;
}
//# sourceMappingURL=ButtonComponent.d.ts.map