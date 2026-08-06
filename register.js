/* ==================== register.js ==================== */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");
    const submitBtn = form.querySelector("button[type='submit']");
    const btnText = submitBtn.querySelector(".btn-text");
    const spinner = submitBtn.querySelector(".spinner-border");

    const fieldIds = [
        "firstName",
        "lastName",
        "registerEmail",
        "phone",
        "registerPassword",
        "confirmPassword",
        "agreeTerms"
    ];

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        fieldIds.forEach(clearFieldError);
        document.getElementById("register-alert").classList.add("d-none");

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const agreeTerms = document.getElementById("agreeTerms").checked;

        let valid = true;

        if (!firstName) {
            setFieldError("firstName", "First name is required.");
            valid = false;
        }
        if (!lastName) {
            setFieldError("lastName", "Last name is required.");
            valid = false;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFieldError("registerEmail", "Please enter a valid email address.");
            valid = false;
        }
        if (!phone || phone.length < 7) {
            setFieldError("phone", "Please enter a valid phone number.");
            valid = false;
        }
        if (!password || password.length < 8) {
            setFieldError("registerPassword", "Password must be at least 8 characters.");
            valid = false;
        }
        if (confirmPassword !== password || !confirmPassword) {
            setFieldError("confirmPassword", "Passwords do not match.");
            valid = false;
        }
        if (!agreeTerms) {
            setFieldError("agreeTerms", "You must agree to the terms to continue.");
            valid = false;
        }

        if (!valid) return;

        submitBtn.disabled = true;
        btnText.textContent = "Creating account...";
        spinner.classList.remove("d-none");

        setTimeout(() => {
            try {
                const user = AuthStore.registerUser({ firstName, lastName, email, phone, password });
                AuthStore.login(email, password);
                showAuthAlert("register-alert", `Account created! Welcome, ${user.firstName}. Redirecting...`, "success");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 900);
            } catch (err) {
                showAuthAlert("register-alert", err.message, "danger");
                submitBtn.disabled = false;
                btnText.textContent = "Create Account";
                spinner.classList.add("d-none");
            }
        }, 500);
    });
});
