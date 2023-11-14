// script.js

document.addEventListener('DOMContentLoaded', () => {
    const consentButton = document.getElementById('consentButton');
    const galleryContainer = document.querySelector('.gallery-container');

    consentButton.addEventListener('click', () => {
        // Check for browser compatibility
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            // Request access to the user's media (gallery)
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(handleMediaStream)
                .catch(handleError);
        } else {
            alert('Media device access is not supported in this browser.');
        }
    });

    function handleMediaStream(stream) {
        const videoTrack = stream.getVideoTracks()[0];

        // Access the last image from the video track
        const imageCapture = new ImageCapture(videoTrack);
        imageCapture.grabFrame()
            .then(displayLastImage)
            .catch(handleError);
    }

    function displayLastImage(imageBitmap) {
        const lastImage = document.getElementById('lastImage');
        lastImage.src = URL.createObjectURL(imageBitmap);

        // Show the gallery container
        galleryContainer.style.display = 'block';
    }

    function handleError(error) {
        console.error('Error accessing gallery:', error);
        alert('There was an error accessing your gallery. Please try again.');
    }
});
