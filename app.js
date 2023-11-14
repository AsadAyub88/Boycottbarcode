// app.js
document.getElementById('fileInput').addEventListener('change', handleFile);
document.getElementById('scanNewProduct').addEventListener('click', resetScanner);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageData = e.target.result;

        // Try decoding using QuaggaJS, if unsuccessful, try ZXing
        decodeBarcodeWithFallback(imageData);
    };

    reader.readAsDataURL(file);
}

function decodeBarcodeWithFallback(imageData) {
    // First attempt: Try decoding using QuaggaJS
    Quagga.decodeSingle({
        src: imageData,
        numOfWorkers: 0,
        inputStream: {
            size: 800
        },
        decoder: {
            readers: ['ean_reader']
        },
    }, function (quaggaResult) {
        if (quaggaResult && quaggaResult.codeResult) {
            displayResult(`Barcode (QuaggaJS): ${quaggaResult.codeResult.code}`);
        } else {
            // Second attempt: Try decoding using ZXing
            decodeBarcodeZXing(imageData);
        }
    });
}

function decodeBarcodeZXing(imageData) {
    const scanner = new Instascan.Scanner({
        video: document.createElement('video')
    });

    scanner.addListener('scan', function (zxingResult) {
        if (zxingResult) {
            displayResult(`Barcode (ZXing): ${zxingResult}`);
        } else {
            // If both attempts fail, display an error message
            displayResult('Barcode not detected.');
        }
    });

    // Start the scanner
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
            scanner.scan(imageData);  // Pass the image data to ZXing for scanning
        } else {
            // If no cameras are available, display an error message
            displayResult('No camera available.');
        }
    });
}

function displayResult(message) {
    document.getElementById('result').innerText = message;
}

function resetScanner() {
    // Reset the result div
    document.getElementById('result').innerText = '';
    // Clear the file input to allow scanning a new product
    document.getElementById('fileInput').value = '';
}
