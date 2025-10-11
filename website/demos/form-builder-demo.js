// Form Builder Demo Script
$(document).ready(function() {
    // Check if jQuery UI is loaded
    if (typeof $.ui === 'undefined') {
        alert('jQuery UI is not loaded! Please include jQuery UI for drag and drop functionality.');
        return;
    }

    // Initialize the form builder
    const formBuilder = new FormBuilder('form-builder');

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

    // Form Builder Demo initialized successfully
});
