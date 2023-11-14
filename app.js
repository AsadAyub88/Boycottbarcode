// script.js

document.addEventListener('DOMContentLoaded', () => {
    const consentButton = document.getElementById('consentButton');
    const galleryContainer = document.querySelector('.gallery-container');
    const fileInput = document.getElementById('fileInput');
    
    consentButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileSelection);

    function handleFileSelection(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            displayLastImage(selectedFile);
        } else {
            alert('No file selected. Please try again.');
        }
    }

    function displayLastImage(imageFile) {
        const lastImage = document.getElementById('lastImage');
        lastImage.src = URL.createObjectURL(imageFile);

        // Show the gallery container
        galleryContainer.style.display = 'block';
    }
});
