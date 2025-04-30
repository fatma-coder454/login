const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

function validateInput(input, isValid, errorElement) {
    if (isValid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorElement.style.display = 'none';
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.style.display = 'block';
    }
}

emailInput.addEventListener('input', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateInput(emailInput, emailPattern.test(emailInput.value), emailError);
});

passwordInput.addEventListener('input', () => {
    validateInput(passwordInput, passwordInput.value.length >= 6, passwordError);
});

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(emailInput.value);
    const isPasswordValid = passwordInput.value.length >= 6;

    validateInput(emailInput, isEmailValid, emailError);
    validateInput(passwordInput, isPasswordValid, passwordError);

    if (isEmailValid && isPasswordValid) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.email === emailInput.value && user.password === passwordInput.value) {
            alert('Login successful!');
            loginForm.reset();
            document.querySelectorAll('input').forEach(input => input.classList.remove('valid'));
            window.location.href = "home.html";  
        } else {
            alert('Invalid email or password.');
        }
    }
});

// دالة تغيير رؤية الباسورد
function togglePasswordVisibility(inputId, icon) {
    const input = document.getElementById(inputId);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    icon.textContent = isPassword ? '🙈' : '👁️';
}
