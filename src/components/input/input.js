class InputComponent extends BaseComponent {
    render() {
        const $container = createElement('div', 'ui-input');
        const $label = createElement('label', '', this.config.label || 'Label');
        const $input = $('<input type="text">')
            .attr('placeholder', this.config.placeholder || 'Enter text')
            .attr('id', this.id);

        $container.append($label).append('<br>').append($input);
        return $container;
    }
}

//(function ($) {
//    $.fn.inputComponent = function (config) {
//        const $input = $('<input type="text" class="ui-input">')
//            .attr('placeholder', config.placeholder || 'Ender text');

//        if (config.label) {
//            const $label = $('<label>').text(config.label);

//            this.append($label).append($input);
//        }
//        else {
//            this.append($input);
//        }

//        return this;
//    };
//})(jQuery)
