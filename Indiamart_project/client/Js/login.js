// Ensure variable is not declared multiple times
if (!window.mobileInput) {
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
                document.close(); // Ensure this is not causing errors
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            alert('Error connecting to server');
        }
    });
}

function logout() {
    fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include' // Ensures cookies/session data are included
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("You have been logged out.");
            window.location.href = "index.html"; // Redirect to login page
        } else {
            alert("Logout failed. Please try again.");
        }
    })
    .catch(error => {
        console.error("Logout error:", error);
        alert("Error logging out. Please try again.");
    });
}
