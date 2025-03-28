// login.js

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
        // Send POST request
        const response = await fetch('http://localhost:8000/mobile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: mobileNumber })
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert('Error connecting to server');
    }
});
