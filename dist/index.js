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
// Re-export for global usage
import { ComponentManager } from './core/ComponentManager';
import { InputComponent } from './components/input/InputComponent';
import { ButtonComponent } from './components/button/ButtonComponent';
import { BaseComponent } from './core/BaseComponent';
// Make components available globally for backward compatibility
if (typeof window !== 'undefined') {
    window.InputComponent = InputComponent;
    window.ButtonComponent = ButtonComponent;
    window.BaseComponent = BaseComponent;
}
//# sourceMappingURL=index.js.map