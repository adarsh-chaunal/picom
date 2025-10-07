// Startup
'use strict';

$(document).ready(function () {
    console.log("Testing UI Components...");

    const input = new InputComponent({
        label: 'Username',
        placeholder: 'Enter your username'
    }).render();

    const btn = new ButtonComponent({
        text: 'Submit',
        onClick: () => alert('Button clicked!')
    }).render();

    $('#test-area').append(input).append(btn);
});
