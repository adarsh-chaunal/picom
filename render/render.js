// Render JSON schema to actual form

function renderForm(schema, containerId) {
    const $container = $(`#${containerId}`).empty();
    schema.fields.forEach(field => {
        const $el = $('<div>').addClass('form-field');
        if (field.type === 'input') $el.inputComponent(field);
        if (field.type === 'select') $el.selectComponent(field);
        $container.append($el);
    });
}