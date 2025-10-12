// CSS Loader - Automatically loads component CSS
class CSSLoader {
    constructor() {
        this.loadedStyles = new Set();
        this.styleElement = null;
    }

    // Load CSS for a component
    loadComponentCSS(componentName) {
        if (this.loadedStyles.has(componentName)) {
            return; // Already loaded
        }

        // For bundled version, CSS is already included
        // This is mainly for development or when using individual components
        if (typeof window.PICOM_BUNDLED !== 'undefined' && window.PICOM_BUNDLED) {
            this.loadedStyles.add(componentName);
            return;
        }

        // Load individual component CSS (for development)
        this.injectCSS(componentName);
        this.loadedStyles.add(componentName);
    }

    // Inject CSS into the document
    injectCSS(componentName) {
        const cssMap = {
            'input': `
                .picom-textbox {
                    margin-bottom: 15px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .picom-textbox-label {
                    font-weight: 600;
                    display: block;
                    margin-bottom: 5px;
                    color: #333;
                    font-size: 14px;
                }
                .picom-textbox-input {
                    width: 100%;
                    padding: 10px 12px;
                    border: 2px solid #e1e5e9;
                    border-radius: 6px;
                    font-size: 14px;
                    transition: border-color 0.2s ease;
                    box-sizing: border-box;
                }
                .picom-textbox-input:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                }
                .picom-textbox-input::placeholder {
                    color: #6c757d;
                }
            `,
            'button': `
                .picom-button {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
                }
                .picom-button:hover {
                    background: #0056b3;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
                }
                .picom-button:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
                }
                .picom-button:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
                }
            `,
            'checkbox': `
                .picom-checkbox {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .picom-checkbox-input {
                    width: 18px;
                    height: 18px;
                    margin-right: 8px;
                    cursor: pointer;
                    accent-color: #007bff;
                }
                .picom-checkbox-label {
                    font-weight: 500;
                    cursor: pointer;
                    color: #333;
                    font-size: 14px;
                    user-select: none;
                }
                .picom-checkbox-label:hover {
                    color: #007bff;
                }
            `,
            'select': `
                .picom-select {
                    margin-bottom: 15px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .picom-select-label {
                    font-weight: 600;
                    display: block;
                    margin-bottom: 5px;
                    color: #333;
                    font-size: 14px;
                }
                .picom-select-input {
                    width: 100%;
                    padding: 10px 12px;
                    border: 2px solid #e1e5e9;
                    border-radius: 6px;
                    background-color: white;
                    cursor: pointer;
                    font-size: 14px;
                    transition: border-color 0.2s ease;
                    box-sizing: border-box;
                }
                .picom-select-input:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                }
                .picom-select-input:hover {
                    border-color: #007bff;
                }
            `
        };

        const css = cssMap[componentName];
        if (css) {
            this.addStyleToDocument(css);
        }
    }

    // Add CSS to document
    addStyleToDocument(css) {
        if (!this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.setAttribute('data-picom-css', 'true');
            document.head.appendChild(this.styleElement);
        }
        
        this.styleElement.textContent += css;
    }

    // Check if CSS is already loaded
    isLoaded(componentName) {
        return this.loadedStyles.has(componentName);
    }

    // Load all component CSS
    loadAllCSS() {
        const components = ['input', 'button', 'checkbox', 'select', 'card', 'navbar', 'hero', 'section'];
        components.forEach(component => this.loadComponentCSS(component));
    }
}

// Global CSS loader instance
window.PicomCSSLoader = new CSSLoader();

// Auto-load CSS when components are used
document.addEventListener('DOMContentLoaded', function() {
    // Mark as bundled if using dist files
    if (document.querySelector('script[src*="dist/picom.js"]')) {
        window.PICOM_BUNDLED = true;
    }
});
