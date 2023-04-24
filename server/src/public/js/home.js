const account = document.querySelector('.account');
const cancel = document.querySelectorAll('.cancel');

account.addEventListener('click', (e) => {
    e.preventDefault();
    login.style.display = 'flex';
});
cancel.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        login.style.display = 'none';
        register.style.display = 'none';
    });
});
// Login
const login = document.querySelector('.login');
const loginContent = document.querySelector('.login__content');
const loginFrm = document.querySelector('.register__input--link');

login.addEventListener('click', () => {
    login.style.display = 'none';
});
loginContent.addEventListener('click', (e) => {
    e.stopPropagation();
});
loginFrm.addEventListener('click', (e) => {
    e.preventDefault();
    register.style.display = 'none';
    login.style.display = 'flex';
});

// Register
const register = document.querySelector('.register');
const registerFrm = document.querySelector('.login__input--link');
const registerContent = document.querySelector('.register__content');

registerFrm.addEventListener('click', (e) => {
    e.preventDefault();
    login.style.display = 'none';
    register.style.display = 'flex';
});

register.addEventListener('click', () => {
    register.style.display = 'none';
});
registerContent.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Validate form

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirms = document.getElementById('confirm');

const checkName = document.querySelector('.check-name');
const checkPass = document.querySelector('.check-pass');
const checkConfirm = document.querySelector('.check-confirm');
const checkEmail = document.querySelector('.check-email');

const btnSubmit = document.querySelector('.register__input--submit');

const checkData = (action, min, max) => {
    switch (action) {
        case 'name':
            if (username.value) {
                if (username.value.length < min) {
                    checkName.innerHTML = `Toi thieu ${min} ki tu`;
                } else if (username.length > max) {
                    checkName.innerHTML = `Toi da ${max} ki tu`;
                } else {
                    checkName.innerHTML = '';
                }
            } else {
                checkName.innerHTML = 'Username is valid ';
            }
            break;

        case 'email': {
            if (email.value) {
                const regex =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (regex.test(email.value)) {
                    checkEmail.innerHTML = '';
                } else {
                    checkEmail.innerHTML = 'email not format';
                }
            } else {
                checkEmail.innerHTML = 'Email is valid';
            }
            break;
        }
        case 'password': {
            if (password.value) {
                if (password.value.length < min) {
                    checkPass.innerHTML = `Password Toi thieu ${min} ki tu`;
                } else if (password.value.length > max) {
                    checkPass.innerHTML = `Password Toi da ${max} ki tu`;
                } else {
                    checkPass.innerHTML = '';
                }
            } else {
                checkPass.innerHTML = 'Password is valid';
            }
            break;
        }
        case 'confirm': {
            if (confirms.value) {
                if (confirms.value === password.value) {
                    checkConfirm.innerHTML = '';
                } else {
                    checkConfirm.innerHTML = 'Confirm not match password';
                }
            } else {
                checkConfirm.innerHTML = 'Confirm is valid';
            }
            break;
        }

        default:
            console.log('errr');
    }
};

username.addEventListener('keyup', () => {
    checkData('name', 6, 12);
});

email.addEventListener('keyup', () => {
    checkData('email', 6, 12);
});

password.addEventListener('keyup', () => {
    checkData('password', 6, 12);
});

confirms.addEventListener('keyup', () => {
    checkData('confirm', 6, 12);
});

username.addEventListener('focusout', () => {
    checkData('name', 6, 12);
});

email.addEventListener('focusout', () => {
    checkData('email', 6, 12);
});

password.addEventListener('focusout', () => {
    checkData('password', 6, 12);
});

confirms.addEventListener('focusout', () => {
    checkData('confirm', 6, 12);
});

btnSubmit.addEventListener('mousedown', () => {
    if (
        checkName.innerText == false &&
        checkEmail.innerText == false &&
        checkPass.innerText == false &&
        checkConfirm.innerText == false
    ) {
        btnSubmit.type = 'submit';
    } else {
        btnSubmit.type = 'button';
    }
});
