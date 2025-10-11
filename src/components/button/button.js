class ButtonComponent extends BaseComponent {
    constructor(config = {}) {
        super('button', config);
    }

    render() {
        const $btn = createElement('button', 'ui-button', this.config.text || 'Click Me');
        $btn.attr('id', this.id);
        if (this.config.onClick) $btn.on('click', this.config.onClick);
        return $btn;
    }
}
