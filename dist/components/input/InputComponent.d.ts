import { BaseComponent } from '../../core/BaseComponent';
import type { InputConfig } from '../../types/components';
/**
 * Input component for text input fields
 */
export declare class InputComponent extends BaseComponent {
    private inputConfig;
    constructor(config?: InputConfig);
    render(): HTMLElement;
    /**
     * Get the current input value
     */
    getValue(): string;
    /**
     * Set the input value
     */
    setValue(value: string): void;
    /**
     * Focus the input
     */
    focus(): void;
    /**
     * Blur the input
     */
    blur(): void;
    /**
     * Check if the input is valid
     */
    isValid(): boolean;
}
//# sourceMappingURL=InputComponent.d.ts.map