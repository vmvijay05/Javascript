document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".formtag");
    const usernameInput = document.getElementById("fname");

    form.addEventListener("submit", function (event) {
        const username = usernameInput.value;
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.]{4,14}$/;

        if (!usernameRegex.test(username)) {
            alert("Invalid username! \n- Must start with a letter \n- Can contain letters, numbers, underscores, and dots \n- Must be 5 to 15 characters long.");
            event.preventDefault(); // Prevent form submission
        }
    });
});
