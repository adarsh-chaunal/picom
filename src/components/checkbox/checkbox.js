class CheckboxComponent extends BaseComponent {
    constructor(config = {}) {
        super('checkbox', config);
    }

    render() {
        const $container = createElement('div', 'ui-checkbox');
        const $label = createElement('label', '', this.config.label || 'Checkbox');
        const $input = $('<input type="checkbox">')
            .attr('id', this.id)
            .prop('checked', this.config.checked || false);

        if (this.config.onChange) {
            $input.on('change', this.config.onChange);
        }

        $container.append($input).append(' ').append($label);
        return $container;
    }
}