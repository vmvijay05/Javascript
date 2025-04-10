document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("fname").value;
    const email = document.getElementById("mailid").value;
    const mobile = document.getElementById("mobilenumber").value;
    const password = document.getElementById("pw").value;
    const confirmPassword = document.getElementById("cpw").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = {
        username: username,
        email: email,
        mobile: mobile,
        password: password
    };

    try {
        const response = await fetch("http://localhost:8000/details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.status === 200) {
            const result = await response.json();
            alert(result.message);
            // ✅ Redirect to login page
            window.location.href = "../login.html";
        } else {
            const errorData = await response.json();
            alert(errorData.message || "Registration failed.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
});
