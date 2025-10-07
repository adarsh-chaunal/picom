// Common utilities and base classes


class BaseComponent {
    constructor(type, config = {}) {
        this.type = type;
        this.config = config;
        this.id = config.id || `comp-${Math.random().toString(36).substr(2, 9)}`;
    }

    render() {
        throw new Error('Render method not implemented');
    }
}
