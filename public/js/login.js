const login = document.querySelector('.login')
const signup = document.querySelector('.signup')
const frontbox = document.querySelector('.frontbox')
const formSignin = document.querySelector('.sign-in')
const formSignup = document.querySelector('.sign-up')
const username = document.querySelector('[name="username"]')
const email = document.querySelector('[name="email"]')
const password = document.querySelector('[name="password"]')
const errorUsernameUp = document.querySelector('.sign-up .error-username')
const errorEmailUp = document.querySelector('.sign-up .error-email')
const errorPasswordUp = document.querySelector('.sign-up .error-password')
const errorUsernameIn = document.querySelector('.sign-in .error-username')
const errorPasswordIn = document.querySelector('.sign-in .error-password')

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
    }).then(result => result.json())
        .then((result) => {
            if (result.error === true) {
                const msgErr = result.data.message
                errorUsernameUp.textContent = ''
                errorEmailUp.textContent = ''
                errorPasswordUp.textContent = ''
                msgErr.split('.').forEach(msg => {
                    if (msg.includes('Username')) {
                        console.log(msg)
                        errorUsernameUp.style.display = 'block'
                        errorUsernameUp.textContent = msg
                        username.focus()
                    } else if (msg.includes('Email')) {
                        console.log(msg)
                        errorEmailUp.style.display = 'block'
                        errorEmailUp.textContent = msg
                        email.focus()
                    } else if (msg.includes('Password')) {
                        console.log(msg)
                        errorPasswordUp.style.display = 'block'
                        errorPasswordUp.textContent = msg
                        password.focus()
                    }
                })
            } else if (result.message === 'The user has been added successfully') {
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
        .then((result) => {
            if (result.error === true) {
                const msgErr = result.data.message
                errorUsernameIn.textContent = ''
                errorPasswordIn.textContent = ''
                msgErr.split('.').forEach(msg => {
                    if (msg.includes('Username')) {
                        console.log(msg)
                        errorUsernameIn.style.display = 'block'
                        errorUsernameIn.textContent = msg
                        username.focus()
                    } else if (msg.includes('Password')) {
                        console.log(msg)
                        errorPasswordIn.style.display = 'block'
                        errorPasswordIn.textContent = msg
                        password.focus()
                    }
                })
            } else if (result.message === 'The user has been logged successfully') {
                window.location.href = '/sign/homePage'
            }
        })
})
