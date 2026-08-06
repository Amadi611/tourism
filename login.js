/* ==================== login.js ==================== */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const submitBtn = form.querySelector("button[type='submit']");
    const btnText = submitBtn.querySelector(".btn-text");
    const spinner = submitBtn.querySelector(".spinner-border");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Reset previous errors
        ["loginEmail", "loginPassword"].forEach(clearFieldError);
        document.getElementById("login-alert").classList.add("d-none");

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        let valid = true;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFieldError("loginEmail", "Please enter a valid email address.");
            valid = false;
        }
        if (!password) {
            setFieldError("loginPassword", "Please enter your password.");
            valid = false;
        }

        if (!valid) return;

        // Simulate a brief loading state
        submitBtn.disabled = true;
        btnText.textContent = "Logging in...";
        spinner.classList.remove("d-none");

        setTimeout(() => {
            try {
                const user = AuthStore.login(email, password);
                showAuthAlert("login-alert", `Welcome back, ${user.firstName}! Redirecting...`, "success");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 800);
            } catch (err) {
                showAuthAlert("login-alert", err.message, "danger");
                submitBtn.disabled = false;
                btnText.textContent = "Log In";
                spinner.classList.add("d-none");
            }
        }, 500);
    });
});
