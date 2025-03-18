// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.querySelector(".formtag");
//     const usernameInput = document.getElementById("fname");

//     form.addEventListener("submit", function (event) {
//         const username = usernameInput.value;
//         const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.]{4,14}$/;

//         if (!usernameRegex.test(username)) {
//             alert("Invalid username! \n- Must start with a letter \n- Can contain letters, numbers, underscores, and dots \n- Must be 5 to 15 characters long.");
//             event.preventDefault(); // Prevent form submission
//         }
//     });
// });


document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // const obj1=document.getElementById("fname")
    const username = document.getElementById("fname").value;
    const email = document.getElementById("mailid").value;
    const password = document.getElementById("pw").value;
    const confirmPassword = document.getElementById("cpw").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = {
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        alert(result.message); // Show server response
    }
     catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
}

);
