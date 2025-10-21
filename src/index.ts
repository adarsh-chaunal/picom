// Picom UI Library - TypeScript Entry Point

// Core exports
export { BaseComponent } from './core/BaseComponent';
export { ComponentManager } from './core/ComponentManager';

// Component exports
export { InputComponent } from './components/input/InputComponent';
export { ButtonComponent } from './components/button/ButtonComponent';

// Type exports
export * from './types';
export * from './types/components';

// Global declarations
declare global {
  interface Window {
    ComponentManager: ComponentManager;
    PicomCSSLoader: any;
    PICOM_BUNDLED?: boolean;
  }
}

// Re-export for global usage
import { ComponentManager } from './core/ComponentManager';
import { InputComponent } from './components/input/InputComponent';
import { ButtonComponent } from './components/button/ButtonComponent';
import { BaseComponent } from './core/BaseComponent';

// Make components available globally for backward compatibility
if (typeof window !== 'undefined') {
  (window as any).InputComponent = InputComponent;
  (window as any).ButtonComponent = ButtonComponent;
  (window as any).BaseComponent = BaseComponent;
}
