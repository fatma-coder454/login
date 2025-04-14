const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

//  التحقق من صحة الإدخال
function validateInput(input, isValid, errorElement) {
    if (isValid) {
        input.classList.add('valid', 'highlight');
        input.classList.remove('invalid');
        errorElement.style.display = 'none';
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid', 'highlight');
        errorElement.style.display = 'block';
    }
}

// تحقق فوري أثناء الكتابة
nameInput.addEventListener('input', () => {
    validateInput(nameInput, nameInput.value.trim().length > 2, document.getElementById('name-error'));
});

emailInput.addEventListener('input', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateInput(emailInput, emailPattern.test(emailInput.value), document.getElementById('email-error'));
});

passwordInput.addEventListener('input', () => {
    validateInput(passwordInput, passwordInput.value.length >= 6, document.getElementById('password-error'));
});

confirmPasswordInput.addEventListener('input', () => {
    validateInput(confirmPasswordInput, confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== '', document.getElementById('confirm-password-error'));
});

// التحقق عند الإرسال
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isNameValid = nameInput.value.trim().length > 2;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(emailInput.value);
    const isPasswordValid = passwordInput.value.length >= 6;
    const isConfirmPasswordValid = confirmPasswordInput.value === passwordInput.value;

    validateInput(nameInput, isNameValid, document.getElementById('name-error'));
    validateInput(emailInput, isEmailValid, document.getElementById('email-error'));
    validateInput(passwordInput, isPasswordValid, document.getElementById('password-error'));
    validateInput(confirmPasswordInput, isConfirmPasswordValid, document.getElementById('confirm-password-error'));

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        const user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Sign up successful!');
        form.reset();
        document.querySelectorAll('input').forEach(input => input.classList.remove('valid'));
    }
});

//  تغيير رؤية الباسورد
function togglePasswordVisibility(inputId, icon) {
    const input = document.getElementById(inputId);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    icon.textContent = isPassword ? '🙈' : '👁️';
}
