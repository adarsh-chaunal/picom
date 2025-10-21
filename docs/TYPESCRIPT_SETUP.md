# TypeScript Setup Guide for Picom UI Library

## 🚀 Overview

The Picom UI Library now supports TypeScript with full type safety, better IDE support, and improved developer experience. This guide covers the TypeScript setup, folder structure, and usage patterns.

## 📁 Folder Structure

```
picom/
├── src/                          # Source code (TypeScript)
│   ├── types/                    # Type definitions
│   │   ├── index.ts             # Core types
│   │   └── components.ts        # Component-specific types
│   ├── core/                    # Core functionality
│   │   ├── BaseComponent.ts     # Base component class
│   │   └── ComponentManager.ts  # Component lifecycle manager
│   ├── components/              # UI components
│   │   ├── input/
│   │   │   ├── InputComponent.ts
│   │   │   └── input.css
│   │   ├── button/
│   │   │   ├── ButtonComponent.ts
│   │   │   └── button.css
│   │   └── ...
│   ├── builder/                 # Form builder (JavaScript)
│   │   ├── builder.js
│   │   └── builder.css
│   └── index.ts                 # Main entry point
├── dist/                        # Compiled output
│   ├── picom.js                 # Compiled JavaScript
│   ├── picom.min.js            # Minified JavaScript
│   ├── picom.css               # Component styles
│   └── index.d.ts              # TypeScript declarations
├── examples/                    # Usage examples
│   ├── typescript-usage.ts     # TypeScript examples
│   ├── typescript-example.html # HTML demo
│   └── pure-js-usage.html      # JavaScript examples
├── website/                     # Website files (JavaScript)
├── docs/                        # Documentation
├── tsconfig.json               # TypeScript configuration
├── package.json                # Package configuration
└── build.js                    # Legacy build script
```

## 🔧 TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "website", "examples", "docs"]
}
```

## 📦 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Build TypeScript

```bash
# Build TypeScript to JavaScript
npm run build:ts

# Or build everything (TypeScript + CSS)
npm run build
```

### 3. Type Checking

```bash
# Check types without emitting files
npm run type-check
```

## 🎯 Usage Patterns

### 1. Basic Component Usage

```typescript
import { InputComponent, ButtonComponent, InputConfig, ButtonConfig } from 'picom-ui-library';

// Create input with full type safety
const inputConfig: InputConfig = {
  id: 'username',
  label: 'Username',
  type: 'text',
  required: true,
  onChange: (event: Event) => {
    const target = event.target as HTMLInputElement;
    console.log('Value:', target.value);
  }
};

const input = new InputComponent(inputConfig);
document.body.appendChild(input.render());
```

### 2. Component Lifecycle Management

```typescript
import { ComponentManager } from 'picom-ui-library';

// Render with automatic lifecycle management
const componentData = ComponentManager.renderComponent(InputComponent, container, {
  config: {
    id: 'email',
    label: 'Email',
    type: 'email'
  }
});

// Dispose when no longer needed
componentData?.dispose();
```

### 3. Form Validation

```typescript
// Create multiple components
const components: { [key: string]: InputComponent } = {};

['firstName', 'lastName', 'email'].forEach(field => {
  const component = new InputComponent({
    id: field,
    label: field.charAt(0).toUpperCase() + field.slice(1),
    required: true
  });
  components[field] = component;
  container.appendChild(component.render());
});

// Validate all components
const isValid = Object.values(components).every(comp => comp.isValid());

// Collect form data
const formData = Object.fromEntries(
  Object.entries(components).map(([key, comp]) => [key, comp.getValue()])
);
```

## 🔍 Type Definitions

### Core Types

```typescript
// Base configuration for all components
interface BaseConfig {
  id?: string;
  className?: string;
  data?: Record<string, string>;
  disabled?: boolean;
  visible?: boolean;
}

// Component lifecycle interface
interface ComponentLifecycle {
  onMounted?(): void;
  onBeforeDispose?(): void;
  onDisposed?(): void;
}

// Base component interface
interface BaseComponentInterface extends ComponentLifecycle {
  readonly type: string;
  readonly id: string;
  readonly element: HTMLElement | null;
  readonly isDisposed: boolean;
  
  render(): HTMLElement;
  dispose(): void;
  updateConfig(newConfig: Partial<BaseConfig>): void;
}
```

### Component-Specific Types

```typescript
// Input component configuration
interface InputConfig extends BaseConfig {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  onChange?: EventHandler<Event>;
  onFocus?: EventHandler<FocusEvent>;
  onBlur?: EventHandler<FocusEvent>;
}

// Button component configuration
interface ButtonConfig extends BaseConfig {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: EventHandler<MouseEvent>;
}
```

## 🛠️ Development Workflow

### 1. Development Mode

```bash
# Start development server
npm run dev

# In another terminal, watch for changes
npm run type-check -- --watch
```

### 2. Building for Production

```bash
# Clean previous build
npm run clean

# Build TypeScript and CSS
npm run build

# Verify build
ls -la dist/
```

### 3. Legacy JavaScript Support

```bash
# Build legacy JavaScript version (for backward compatibility)
npm run build:legacy
```

## 🎨 IDE Support

### VS Code Configuration

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

### IntelliSense Features

- **Auto-completion**: Full IntelliSense for component configurations
- **Type checking**: Real-time type validation
- **Refactoring**: Safe renaming and refactoring
- **Go to definition**: Jump to component implementations
- **Hover information**: Detailed type information

## 🔄 Migration from JavaScript

### 1. Update Imports

```javascript
// Before (JavaScript)
const input = new InputComponent({
  id: 'username',
  label: 'Username'
});

// After (TypeScript)
import { InputComponent, InputConfig } from 'picom-ui-library';

const inputConfig: InputConfig = {
  id: 'username',
  label: 'Username'
};
const input = new InputComponent(inputConfig);
```

### 2. Add Type Annotations

```typescript
// Add types to event handlers
const buttonConfig: ButtonConfig = {
  text: 'Submit',
  onClick: (event: MouseEvent) => {
    // event is now properly typed
    console.log('Clicked at:', event.clientX, event.clientY);
  }
};
```

### 3. Use Component Manager

```typescript
// Use ComponentManager for better lifecycle management
const componentData = ComponentManager.renderComponent(InputComponent, container, {
  config: inputConfig
});

// Automatic cleanup
componentData?.dispose();
```

## 🚀 Benefits of TypeScript

1. **Type Safety**: Catch errors at compile time
2. **Better IDE Support**: IntelliSense, auto-completion, refactoring
3. **Self-Documenting**: Types serve as documentation
4. **Easier Refactoring**: Safe renaming and restructuring
5. **Better Team Collaboration**: Clear interfaces and contracts
6. **Runtime Safety**: Fewer runtime errors

## 📚 Examples

See the following files for complete examples:

- `examples/typescript-usage.ts` - Comprehensive TypeScript examples
- `examples/typescript-example.html` - Interactive HTML demo
- `src/index.ts` - Main library entry point
- `src/types/` - Complete type definitions

## 🤝 Contributing

When contributing to the TypeScript version:

1. Always add proper type definitions
2. Use strict TypeScript settings
3. Write comprehensive examples
4. Update documentation
5. Test both TypeScript and JavaScript usage

## 📝 Notes

- The library maintains backward compatibility with JavaScript
- TypeScript is optional - you can still use the JavaScript version
- All components work the same way in both TypeScript and JavaScript
- The build system supports both TypeScript and legacy JavaScript builds
