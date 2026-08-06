/* ==================== auth.js ====================
   Shared helpers for login.html and register.html.

   NOTE: This uses localStorage as a stand-in "database" so the
   pages work without a backend. It is for DEMO/PROTOTYPE purposes
   only — passwords here are NOT securely hashed and localStorage
   is not a safe place to store real credentials. Before going live,
   replace the AuthStore functions below with real API calls to your
   backend (which should hash passwords with something like bcrypt
   and issue a proper session/JWT).
====================================================== */

const AuthStore = {
    USERS_KEY: "serendib_users",
    SESSION_KEY: "serendib_session",

    getUsers() {
        const raw = localStorage.getItem(this.USERS_KEY);
        return raw ? JSON.parse(raw) : [];
    },

    saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    },

    findUserByEmail(email) {
        return this.getUsers().find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
        );
    },

    registerUser({ firstName, lastName, email, phone, password }) {
        const users = this.getUsers();
        if (this.findUserByEmail(email)) {
            throw new Error("An account with this email already exists.");
        }
        // Demo-only "hash" — replace with real hashing on a real backend.
        const user = {
            id: Date.now().toString(36),
            firstName,
            lastName,
            email,
            phone,
            password
        };
        users.push(user);
        this.saveUsers(users);
        return user;
    },

    login(email, password) {
        const user = this.findUserByEmail(email);
        if (!user || user.password !== password) {
            throw new Error("Invalid email or password.");
        }
        localStorage.setItem(
            this.SESSION_KEY,
            JSON.stringify({ id: user.id, email: user.email, firstName: user.firstName })
        );
        return user;
    },

    logout() {
        localStorage.removeItem(this.SESSION_KEY);
    },

    getCurrentUser() {
        const raw = localStorage.getItem(this.SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    }
};

/* Show/hide password fields */
document.addEventListener("DOMContentLoaded", () => {
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
});

/* Small helper to show an alert box */
function showAuthAlert(elementId, message, type = "danger") {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.className = `alert alert-${type}`;
    el.classList.remove("d-none");
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
