// Main drag-and-drop builder

$('.component-item').draggable({
    helper: 'clone',
    revert: 'invalid'
});

$('#form-canvas').dropable({
    accept: '.component-item',
    drop: function (event, ui) {
        const type = ui.helper.data('type');
        addComponentToCanvas('type');
    }
})