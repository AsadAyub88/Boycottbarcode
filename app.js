// app.js
document.getElementById('fileInput').addEventListener('change', handleFile);
document.getElementById('scanNewProduct').addEventListener('click', resetScanner);

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
            const barcode = result.codeResult.code;
            // Check if the scanned product code relates to specific countries
            checkCountryRestrictions(barcode);
        } else {
            // Handle case when barcode is not detected
            document.getElementById('result').innerText = 'Barcode not detected.';
        }
    });
}

function checkCountryRestrictions(barcode) {
    // List of restricted countries
    const restrictedCountries = ['EuropeanUnion', 'Australia', 'Israel', 'India', 'USA', 'Canada'];
    
    // Extract country code from the barcode (assuming it's the first few characters)
    const countryCode = barcode.substring(0, 2);

    // Check if the country code is in the list of restricted countries
    if (restrictedCountries.includes(countryCode)) {
        // Display a message for restricted products
        document.getElementById('result').innerText = 'Zionist Product - Banned!';
    } else {
        // Display a message for allowed products
        document.getElementById('result').innerText = 'Product is allowed.';
    }
}

function resetScanner() {
    // Reset the result div
    document.getElementById('result').innerText = '';
    // Clear the file input to allow scanning a new product
    document.getElementById('fileInput').value = '';
}
