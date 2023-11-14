// app.js
document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageData = e.target.result;
        // Use a barcode scanning library here to process imageData
        // Update the result div with the scanned barcode or product name
    };

    reader.readAsDataURL(file);
}
