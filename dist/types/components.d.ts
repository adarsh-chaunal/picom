import type { BaseConfig, EventHandler } from './index';
/**
 * Input component configuration
 */
export interface InputConfig extends BaseConfig {
    /** Label text for the input */
    label?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Input value */
    value?: string;
    /** Input type (text, email, password, etc.) */
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    /** Whether the input is required */
    required?: boolean;
    /** Maximum length */
    maxLength?: number;
    /** Minimum length */
    minLength?: number;
    /** Pattern for validation */
    pattern?: string;
    /** Change event handler */
    onChange?: EventHandler<Event>;
    /** Focus event handler */
    onFocus?: EventHandler<FocusEvent>;
    /** Blur event handler */
    onBlur?: EventHandler<FocusEvent>;
}
/**
 * Button component configuration
 */
export interface ButtonConfig extends BaseConfig {
    /** Button text */
    text: string;
    /** Button type */
    type?: 'button' | 'submit' | 'reset';
    /** Button variant */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    /** Button size */
    size?: 'small' | 'medium' | 'large';
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Click event handler */
    onClick?: EventHandler<MouseEvent>;
    /** Focus event handler */
    onFocus?: EventHandler<FocusEvent>;
    /** Blur event handler */
    onBlur?: EventHandler<FocusEvent>;
}
/**
 * Checkbox component configuration
 */
export interface CheckboxConfig extends BaseConfig {
    /** Label text for the checkbox */
    label?: string;
    /** Whether the checkbox is checked */
    checked?: boolean;
    /** Whether the checkbox is required */
    required?: boolean;
    /** Change event handler */
    onChange?: EventHandler<Event>;
    /** Focus event handler */
    onFocus?: EventHandler<FocusEvent>;
    /** Blur event handler */
    onBlur?: EventHandler<FocusEvent>;
}
/**
 * Select component configuration
 */
export interface SelectConfig extends BaseConfig {
    /** Label text for the select */
    label?: string;
    /** Available options */
    options: string[] | SelectOption[];
    /** Selected value */
    value?: string;
    /** Whether the select is required */
    required?: boolean;
    /** Whether multiple selection is allowed */
    multiple?: boolean;
    /** Change event handler */
    onChange?: EventHandler<Event>;
    /** Focus event handler */
    onFocus?: EventHandler<FocusEvent>;
    /** Blur event handler */
    onBlur?: EventHandler<FocusEvent>;
}
/**
 * Select option interface
 */
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
/**
 * Card component configuration
 */
export interface CardConfig extends BaseConfig {
    /** Card title */
    title?: string;
    /** Card description */
    description?: string;
    /** Card image */
    image?: string | CardImage;
    /** Card buttons */
    buttons?: CardButton[];
    /** Card variant */
    variant?: 'default' | 'outlined' | 'elevated';
}
/**
 * Card image interface
 */
export interface CardImage {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
}
/**
 * Card button interface
 */
export interface CardButton {
    text: string;
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    onClick?: EventHandler<MouseEvent>;
}
/**
 * Navbar component configuration
 */
export interface NavbarConfig extends BaseConfig {
    /** Brand configuration */
    brand?: NavbarBrand;
    /** Navigation items */
    items?: NavbarItem[];
    /** Mobile menu configuration */
    mobile?: boolean;
    /** Navbar variant */
    variant?: 'default' | 'dark' | 'light';
    /** Whether the navbar is fixed */
    fixed?: boolean;
}
/**
 * Navbar brand interface
 */
export interface NavbarBrand {
    text?: string;
    logo?: string;
    href?: string;
}
/**
 * Navbar item interface
 */
export interface NavbarItem {
    text: string;
    href?: string;
    active?: boolean;
    onClick?: EventHandler<MouseEvent>;
}
/**
 * Hero component configuration
 */
export interface HeroConfig extends BaseConfig {
    /** Hero title */
    title?: string;
    /** Hero subtitle */
    subtitle?: string;
    /** Background image */
    background?: string;
    /** Hero buttons */
    buttons?: HeroButton[];
    /** Hero variant */
    variant?: 'default' | 'centered' | 'split';
}
/**
 * Hero button interface
 */
export interface HeroButton {
    text: string;
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    onClick?: EventHandler<MouseEvent>;
}
/**
 * Section component configuration
 */
export interface SectionConfig extends BaseConfig {
    /** Section title */
    title?: string;
    /** Section subtitle */
    subtitle?: string;
    /** Section content */
    content?: string | ComponentConfig[];
    /** Background configuration */
    background?: SectionBackground;
    /** Section variant */
    variant?: 'default' | 'light' | 'dark' | 'primary' | 'secondary';
}
/**
 * Section background interface
 */
export interface SectionBackground {
    color?: string;
    image?: string;
    size?: 'cover' | 'contain' | 'auto';
    position?: string;
}
/**
 * Component configuration for dynamic content
 */
export interface ComponentConfig {
    type: string;
    config: any;
}
/**
 * Layout component configuration
 */
export interface LayoutConfig extends BaseConfig {
    /** Layout type */
    type: 'default' | 'landing' | 'dashboard' | 'blog' | 'portfolio' | 'minimal' | 'sidebar' | 'grid';
    /** Layout sections */
    sections?: LayoutSection[];
}
/**
 * Layout section interface
 */
export interface LayoutSection {
    name: string;
    component?: ComponentConfig;
}
//# sourceMappingURL=components.d.ts.map