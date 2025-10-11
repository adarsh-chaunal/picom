class SelectComponent extends BaseComponent {
    constructor(config = {}) {
        super('select', config);
    }

    render() {
        const $container = createElement('div', 'ui-select');
        const $label = createElement('label', '', this.config.label || 'Select');
        const $select = $('<select>').attr('id', this.id);

        if (this.config.options && Array.isArray(this.config.options)) {
            this.config.options.forEach(option => {
                const $option = $('<option>').text(option).val(option);
                $select.append($option);
            });
        }

        if (this.config.onChange) {
            $select.on('change', this.config.onChange);
        }

        $container.append($label).append('<br>').append($select);
        return $container;
    }
}