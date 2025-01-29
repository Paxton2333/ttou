document.addEventListener('DOMContentLoaded', () => {
    const loginTrigger = document.getElementById('login-trigger');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    loginTrigger.addEventListener('click', () => {
        loginModal.classList.add('show');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'Administrator' && password === 'Admin') {
            // Redirect to new URL
            window.location.href = 'https://paxton2333.github.io/ttou-logged';
        } else {
            // Show error message
            loginError.textContent = 'Wrong Username or Password, Please try again!';
        }
    });

    // Close modal when clicking outside
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('show');
        }
    });
});
