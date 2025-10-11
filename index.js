'use strict';

$(document).ready(function () {
    console.log("Initializing Picom UI Library Demo...");

    // Check if jQuery UI is loaded
    if (typeof $.ui === 'undefined') {
        console.error('jQuery UI is not loaded! Please include jQuery UI for drag and drop functionality.');
        return;
    }

    // Initialize the form builder
    const formBuilder = new FormBuilder('form-builder');
    
    // Debug: Check if components are created
    setTimeout(() => {
        console.log('Component items found:', $('.component-item').length);
        console.log('Form builder container:', $('#form-builder').length);
    }, 100);

    // Setup control buttons
    $('#preview-btn').on('click', function() {
        const formData = formBuilder.getFormData();
        alert('Form Data:\n' + JSON.stringify(formData, null, 2));
    });

    $('#export-btn').on('click', function() {
        const formData = formBuilder.getFormData();
        const jsonString = JSON.stringify(formData, null, 2);
        
        // Create and download JSON file
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    $('#clear-btn').on('click', function() {
        if (confirm('Are you sure you want to clear all components?')) {
            formBuilder.clearForm();
        }
    });

    console.log("Form Builder initialized successfully!");
});
