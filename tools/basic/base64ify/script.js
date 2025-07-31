/**
 * Base64ify - Image to Base64 Converter Tool
 * 
 * This script provides functionality to:
 * 1. Convert images to Base64 strings
 * 2. Convert Base64 strings back to images
 * 3. Handle file drag and drop
 * 4. Provide image previews
 * 5. Download converted images
 * 
 * @author Your Name
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const fileInput = document.getElementById('file-input');
    const dropArea = document.getElementById('drop-area');
    const imagePreview = document.getElementById('image-preview');
    const base64Result = document.getElementById('base64-result');
    const copyBase64Btn = document.getElementById('copy-base64');
    const base64Input = document.getElementById('base64-input');
    const convertToImageBtn = document.getElementById('convert-to-image');
    const imageResult = document.getElementById('image-result');
    const downloadImageBtn = document.getElementById('download-image');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const notification = document.getElementById('notification');
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Tab Switching Functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Clear all inputs and previews when switching tabs
            clearAll();
        });
    });

    // Drag and Drop Functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropArea.classList.add('highlight');
    }

    function unhighlight() {
        dropArea.classList.remove('highlight');
    }

    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            handleFiles(files);
        }
    }

    // File Input Handling
    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            handleFiles(this.files);
        }
    });

    /**
     * Handles the selected files and processes them
     * @param {FileList} files - List of files to process
     */
    function handleFiles(files) {
        const file = files[0];
        
        // Check if file is an image
        if (!file.type.match('image.*')) {
            showNotification('Please select an image file', true);
            return;
        }
        
        // Display image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            
            // Convert image to Base64
            convertImageToBase64(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    /**
     * Converts an image to Base64 string
     * @param {string} imageData - The image data URL
     */
    function convertImageToBase64(imageData) {
        base64Result.value = imageData;
    }

    // Copy Base64 to Clipboard
    copyBase64Btn.addEventListener('click', function() {
        if (!base64Result.value) {
            showNotification('No Base64 string to copy', true);
            return;
        }
        
        base64Result.select();
        document.execCommand('copy');
        
        // Show notification
        showNotification('Base64 copied to clipboard!');
    });

    // Convert Base64 to Image
    convertToImageBtn.addEventListener('click', function() {
        const base64String = base64Input.value.trim();
        
        if (!base64String) {
            showNotification('Please enter a Base64 string', true);
            return;
        }
        
        // Check if the string is a valid image Base64
        if (!isValidImageBase64(base64String)) {
            showNotification('Invalid Base64 image string', true);
            return;
        }
        
        // Display the image
        imageResult.innerHTML = `<img src="${base64String}" alt="Converted Image">`;
        downloadImageBtn.disabled = false;
        
        // Set download functionality
        downloadImageBtn.onclick = function() {
            downloadImage(base64String);
        };
    });

    /**
     * Validates if a string is a valid image Base64
     * @param {string} str - The string to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function isValidImageBase64(str) {
        // Basic check for data URL format
        return str.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,/);
    }

    /**
     * Downloads an image from a Base64 string
     * @param {string} base64String - The Base64 string of the image
     */
    function downloadImage(base64String) {
        // Extract image type from Base64 string
        const match = base64String.match(/^data:image\/(\w+);base64,/);
        if (!match) {
            showNotification('Invalid image format', true);
            return;
        }
        
        const imageType = match[1];
        const filename = `converted-image.${imageType}`;
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = base64String;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Image downloaded!');
    }

    /**
     * Shows a notification message
     * @param {string} message - The message to display
     * @param {boolean} isError - Whether the notification is an error
     */
    function showNotification(message, isError = false) {
        notification.textContent = message;
        notification.className = 'notification';
        notification.classList.add(isError ? 'error' : 'show');
        
        if (isError) {
            notification.classList.add('error');
        }
        
        notification.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    /**
     * Clears all inputs and previews
     */
    function clearAll() {
        // Clear image to Base64 tab
        imagePreview.innerHTML = '';
        base64Result.value = '';
        fileInput.value = '';
        
        // Clear Base64 to image tab
        base64Input.value = '';
        imageResult.innerHTML = '';
        downloadImageBtn.disabled = true;
    }
});