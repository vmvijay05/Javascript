// Updated Frontend JavaScript for Handling HTML Response
const mobileInput = document.getElementById('mobile');
const signInBtn = document.querySelector('.signin-btn');

signInBtn.addEventListener('click', async () => {
    const mobileNumber = mobileInput.value.trim();

    // Validate mobile number
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }

    try {
        // Send POST request and handle HTML response
        const response = await fetch('http://localhost:8000/mobile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: mobileNumber }),
            credentials: 'include' // Allow cookies
        });

        // Check if the response is HTML
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
            const html = await response.text();
            document.open();
            document.write(html);
            document.close();
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        alert('Error connecting to server');
    }
});






// const mobileInput = document.getElementById('mobile');
// const signInBtn = document.querySelector('.signin-btn');

// signInBtn.addEventListener('click', async () => {
//     const mobileNumber = mobileInput.value.trim();

//     // Validate mobile number
//     if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
//         alert('Please enter a valid 10-digit mobile number');
//         return;
//     }

//     try {
//         // Send POST request
//         const response = await fetch('http://localhost:8000/mobile', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ mobile: mobileNumber })
//         });

//         const data = await response.json();
//         alert(data.message);
//     } catch (error) {
//         alert('Error connecting to server');
//     }
// });
