document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.status === 200) {
            alert("Login successful!");
            // Redirect to dashboard or home page
            window.location.href = "home.html";
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
});
