// DOM helpers

function createElement(tag, className, text) {
    const $el = $(`<${tag}>`);
    if (className) $el.addClass(className);
    if (text) $el.text(text);
    return $el;
}
