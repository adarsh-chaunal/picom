export { BaseComponent } from './core/BaseComponent';
export { ComponentManager } from './core/ComponentManager';
export { InputComponent } from './components/input/InputComponent';
export { ButtonComponent } from './components/button/ButtonComponent';
export * from './types';
export * from './types/components';
declare global {
    interface Window {
        ComponentManager: ComponentManager;
        PicomCSSLoader: any;
        PICOM_BUNDLED?: boolean;
    }
}
import { ComponentManager } from './core/ComponentManager';
//# sourceMappingURL=index.d.ts.map