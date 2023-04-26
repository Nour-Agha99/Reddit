const login = document.querySelector('.login')
const signup = document.querySelector('.signup')
const frontbox = document.querySelector('.frontbox')
const formSignin = document.querySelector('.sign-in')
const formSignup = document.querySelector('.sign-up')
const username = document.querySelector('[name="username"]')
const email = document.querySelector('[name="email"]')
const password = document.querySelector('[name="password"]')
const errorUsername = document.querySelector('.error-username')
const errorEmail = document.querySelector('.error-email')
const errorPassword = document.querySelector('.error-password')
const usernameRegex = /^[a-zA-Z0-9_\-\s]+$/
const emailRegex = /^\S+@\S+\.\S+$/
const passwordRegex = /^.{6,64}$/

document.querySelector('#switch1').addEventListener('click', function () {
    frontbox.classList.add('moving')
    signup.classList.toggle('hide')
    login.classList.toggle('hide')
})

document.querySelector('#switch2').addEventListener('click', function () {
    frontbox.classList.remove('moving')
    signup.classList.toggle('hide')
    login.classList.toggle('hide')
})

setTimeout(function () {
    document.querySelector('#switch1').click()
}, 1000)

setTimeout(function () {
    document.querySelector('#switch2').click()
}, 3000)

formSignup.addEventListener('submit', (event) => {
    let hasError = false

    if (!username.value.match(usernameRegex)) {
        hasError = true
        errorUsername.style.display = 'block'
        errorUsername.textContent = 'Username should only contain letters and numbers.'
        username.focus()
    } else {
        errorUsername.style.display = 'none'
    }

    if (!email.value.match(emailRegex)) {
        hasError = true
        errorEmail.style.display = 'block'
        errorEmail.textContent = 'Please enter a valid email address.'
        email.focus()
    } else {
        errorEmail.style.display = 'none'
    }

    if (!password.value.match(passwordRegex)) {
        hasError = true
        errorPassword.style.display = 'block'
        errorPassword.textContent = 'Password should be at least 6 and at most 64 characters.'
        password.focus()
    } else {
        errorPassword.style.display = 'none'
    }

    if (hasError) {
        event.preventDefault()
    }
})

formSignin.addEventListener('submit', (event) => {
    let hasError = false

    if (!username.value.match(usernameRegex)) {
        hasError = true
        errorUsername.style.display = 'block'
        errorUsername.textContent = 'Username should only contain letters and numbers.'
        username.focus()
    } else {
        errorUsername.style.display = 'none'
    }

    if (!password.value.match(passwordRegex)) {
        hasError = true
        errorPassword.style.display = 'block'
        errorPassword.textContent = 'Password should be at least 6 and at most 64 characters.'
        password.focus()
    } else {
        errorPassword.style.display = 'none'
    }

    if (hasError) {
        event.preventDefault()
    }
})

formSignup.addEventListener('submit', (btn) => {
    btn.preventDefault()
    const obj = new FormData(formSignup)
    const data = Object.fromEntries(obj)
    fetch('/api/v1/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(result => result.json()).then((result) => {
        if (result.message === 'The user has been added successfully') {
            window.location.href = '/sign/homePage'
        }
    })
})

formSignin.addEventListener('submit', (btn) => {
    btn.preventDefault()
    const obj = new FormData(formSignin)
    const data = Object.fromEntries(obj)
    fetch('/api/v1/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(result => result.json())
        .then((result) => { if (result.message === 'The user has been logged successfully') { window.location.href = '/sign/homePage' } })
})
