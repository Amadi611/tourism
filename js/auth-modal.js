/* ==================== auth-modal.js ====================
   Handles the interactive login/register modal on index.html
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const authModal = document.getElementById("authModal");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const authTitle = document.getElementById("auth-title");
    const authToggleText = document.getElementById("auth-toggle-text");
    const authToggleLink = document.getElementById("auth-toggle-link");
    const authAlert = document.getElementById("auth-alert");

    let currentMode = "login"; // "login" or "register"

    // Set mode function
    function setAuthMode(mode) {
        currentMode = mode;
        clearAuthAlert();
        clearAllFieldErrors();

        if (mode === "login") {
            loginForm.classList.remove("d-none");
            registerForm.classList.add("d-none");
            authTitle.textContent = "Welcome Back";
            authToggleText.innerHTML = `Don't have an account? <a href="#" class="fw-semibold text-decoration-none" id="auth-toggle-link">Register here</a>`;
        } else {
            loginForm.classList.add("d-none");
            registerForm.classList.remove("d-none");
            authTitle.textContent = "Create an Account";
            authToggleText.innerHTML = `Already have an account? <a href="#" class="fw-semibold text-decoration-none" id="auth-toggle-link">Log in</a>`;
        }

        // Re-attach event listener to the new toggle link
        document.getElementById("auth-toggle-link").addEventListener("click", (e) => {
            e.preventDefault();
            setAuthMode(currentMode === "login" ? "register" : "login");
        });
    }

    // Handle modal open with mode
    authModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget;
        const mode = button.getAttribute("data-auth-mode");
        setAuthMode(mode || "login");
    });

    // Handle modal close - reset forms
    authModal.addEventListener("hidden.bs.modal", () => {
        loginForm.reset();
        registerForm.reset();
        clearAuthAlert();
        clearAllFieldErrors();
    });

    // Toggle password visibility
    document.querySelectorAll(".toggle-password").forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const input = document.getElementById(targetId);
            const icon = btn.querySelector("i");
            if (input.type === "password") {
                input.type = "text";
                icon.classList.replace("bi-eye", "bi-eye-slash");
            } else {
                input.type = "password";
                icon.classList.replace("bi-eye-slash", "bi-eye");
            }
        });
    });

    // Helper functions
    function showAuthAlert(message, type = "danger") {
        authAlert.textContent = message;
        authAlert.className = `alert alert-${type}`;
        authAlert.classList.remove("d-none");
    }

    function clearAuthAlert() {
        authAlert.textContent = "";
        authAlert.classList.add("d-none");
    }

    function clearFieldError(fieldId) {
        const errorEl = document.getElementById(`${fieldId}-error`);
        const inputEl = document.getElementById(fieldId);
        if (errorEl) errorEl.textContent = "";
        if (inputEl) inputEl.classList.remove("is-invalid");
    }

    function setFieldError(fieldId, message) {
        const errorEl = document.getElementById(`${fieldId}-error`);
        const inputEl = document.getElementById(fieldId);
        if (errorEl) errorEl.textContent = message;
        if (inputEl) inputEl.classList.add("is-invalid");
    }

    function clearAllFieldErrors() {
        const allFields = document.querySelectorAll(".form-control");
        allFields.forEach(field => {
            field.classList.remove("is-invalid");
        });
        const allErrors = document.querySelectorAll(".error-text");
        allErrors.forEach(error => {
            error.textContent = "";
        });
    }

    // Login form submission
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearAuthAlert();
        clearAllFieldErrors();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        let hasError = false;

        // Validation
        if (!email) {
            setFieldError("loginEmail", "Email is required");
            hasError = true;
        } else if (!email.includes("@")) {
            setFieldError("loginEmail", "Please enter a valid email");
            hasError = true;
        }

        if (!password) {
            setFieldError("loginPassword", "Password is required");
            hasError = true;
        }

        if (hasError) return;

        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector(".btn-text");
        const spinner = submitBtn.querySelector(".spinner-border");
        submitBtn.disabled = true;
        btnText.textContent = "Logging in...";
        spinner.classList.remove("d-none");

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if user exists (using localStorage)
            const users = JSON.parse(localStorage.getItem("serendib_users") || "[]");
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (!user) {
                showAuthAlert("No account found with this email. Please register.");
                return;
            }

            if (user.password !== password) {
                showAuthAlert("Invalid email or password.");
                return;
            }

            // Successful login
            localStorage.setItem("serendib_session", JSON.stringify({
                id: user.id,
                email: user.email,
                firstName: user.firstName
            }));

            showAuthAlert("Login successful! Redirecting...", "success");

            setTimeout(() => {
                // Close modal
                const modalInstance = bootstrap.Modal.getInstance(authModal);
                modalInstance.hide();

                // Update UI to show logged in state
                updateNavbarForLoggedIn(user);
            }, 1500);

        } catch (error) {
            showAuthAlert("An error occurred. Please try again.");
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = "Log In";
            spinner.classList.add("d-none");
        }
    });

    // Register form submission
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearAuthAlert();
        clearAllFieldErrors();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const agreeTerms = document.getElementById("agreeTerms").checked;
        let hasError = false;

        // Validation
        if (!firstName) {
            setFieldError("firstName", "First name is required");
            hasError = true;
        }

        if (!lastName) {
            setFieldError("lastName", "Last name is required");
            hasError = true;
        }

        if (!email) {
            setFieldError("registerEmail", "Email is required");
            hasError = true;
        } else if (!email.includes("@")) {
            setFieldError("registerEmail", "Please enter a valid email");
            hasError = true;
        }

        if (!phone) {
            setFieldError("phone", "Phone number is required");
            hasError = true;
        }

        if (!password) {
            setFieldError("registerPassword", "Password is required");
            hasError = true;
        } else if (password.length < 8) {
            setFieldError("registerPassword", "Password must be at least 8 characters");
            hasError = true;
        }

        if (!confirmPassword) {
            setFieldError("confirmPassword", "Please confirm your password");
            hasError = true;
        } else if (password !== confirmPassword) {
            setFieldError("confirmPassword", "Passwords do not match");
            hasError = true;
        }

        if (!agreeTerms) {
            setFieldError("agreeTerms", "You must agree to the terms");
            hasError = true;
        }

        if (hasError) return;

        // Show loading state
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector(".btn-text");
        const spinner = submitBtn.querySelector(".spinner-border");
        submitBtn.disabled = true;
        btnText.textContent = "Creating account...";
        spinner.classList.remove("d-none");

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem("serendib_users") || "[]");
            const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (existingUser) {
                showAuthAlert("An account with this email already exists.");
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(36),
                firstName,
                lastName,
                email,
                phone,
                password
            };

            users.push(newUser);
            localStorage.setItem("serendib_users", JSON.stringify(users));

            // Auto-login after registration
            localStorage.setItem("serendib_session", JSON.stringify({
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName
            }));

            showAuthAlert("Account created successfully! Redirecting...", "success");

            setTimeout(() => {
                // Close modal
                const modalInstance = bootstrap.Modal.getInstance(authModal);
                modalInstance.hide();

                // Update UI to show logged in state
                updateNavbarForLoggedIn(newUser);
            }, 1500);

        } catch (error) {
            showAuthAlert("An error occurred. Please try again.");
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = "Create Account";
            spinner.classList.add("d-none");
        }
    });

    // Update navbar for logged in state
    function updateNavbarForLoggedIn(user) {
        const navbar = document.getElementById("site-navbar");
        if (!navbar) return;

        // Check if user is logged in
        const session = JSON.parse(localStorage.getItem("serendib_session") || "null");
        if (session) {
            // Replace login/register buttons with user info
            const authButtons = document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#authModal"]');
            authButtons.forEach(btn => {
                btn.style.display = "none";
            });

            // Add logout button if it doesn't exist
            if (!document.getElementById("logout-btn")) {
                const heroSection = document.querySelector(".hero .container");
                const logoutDiv = document.createElement("div");
                logoutDiv.className = "mt-4";
                logoutDiv.id = "logout-container";
                logoutDiv.innerHTML = `
                    <span class="me-3">Welcome, ${session.firstName}!</span>
                    <button class="btn btn-outline-danger btn-lg" id="logout-btn">
                        <i class="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                `;
                heroSection.appendChild(logoutDiv);

                document.getElementById("logout-btn").addEventListener("click", () => {
                    localStorage.removeItem("serendib_session");
                    location.reload();
                });
            }
        }
    }

    // Check if user is already logged in on page load
    const session = JSON.parse(localStorage.getItem("serendib_session") || "null");
    if (session) {
        updateNavbarForLoggedIn(session);
    }

    // Initialize toggle link
    document.getElementById("auth-toggle-link").addEventListener("click", (e) => {
        e.preventDefault();
        setAuthMode(currentMode === "login" ? "register" : "login");
    });
});
