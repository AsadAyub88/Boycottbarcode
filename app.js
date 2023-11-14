// app.js
document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageData = e.target.result;

        // Use QuaggaJS library for barcode decoding
        decodeBarcode(imageData);
    };

    reader.readAsDataURL(file);
}

function decodeBarcode(imageData) {
    Quagga.decodeSingle({
        src: imageData,
        numOfWorkers: 0,  // Setting to 0 to run on the main thread (no web workers)
        inputStream: {
            size: 800  // Adjust this size based on your needs
        },
        decoder: {
            readers: ['ean_reader']  // Use 'ean_reader' for EAN-13 barcodes
            // Add more reader types based on the types of barcodes you expect
        },
    }, function (result) {
        if (result && result.codeResult) {
            // Update the result div with the decoded barcode
            document.getElementById('result').innerText = `Barcode: ${result.codeResult.code}`;
        } else {
            // Handle case when barcode is not detected
            document.getElementById('result').innerText = 'Barcode not detected.';
        }
    });
}
