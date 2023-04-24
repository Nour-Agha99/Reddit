const personalImg = document.querySelector('.per-photo .img')
const listBar = document.querySelector('.settings-menu-inner')
const postInput = document.querySelector('.post-input-container input')
const container = document.querySelector('.postPopup')
const postTitle = document.querySelector('.title-post')
const deleteBtn = document.querySelector('.fa-trash')
const postForm = document.querySelector('.post-form')
const personalImage = document.querySelectorAll('.img')
const personalName = document.querySelectorAll('.user-title')

personalImg.addEventListener('click', (event) => {
    event.stopPropagation()
    listBar.classList.toggle('active')
})

document.addEventListener('click', (event) => {
    if (!listBar.contains(event.target)) {
        listBar.classList.remove('active')
    }
})

postInput.addEventListener('focus', (event) => {
    container.classList.add('show')
    postTitle.focus()
})

deleteBtn.addEventListener('click', (event) => {
    container.classList.remove('show')
})

fetch('/api/v1/userData', {
    method: 'GET',
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'text/html'
    }
}).then((data) => data.json()).then((data) => {
    personalImage.forEach((image) => {
        image.style = `background-image: url(${data.user.photo});`
    })
    personalName.forEach((name) => {
        name.textContent = data.user.username
    })
})

postForm.addEventListener('submit', (btn) => {
    btn.preventDefault()
    const obj = new FormData(postForm)
    const data = Object.fromEntries(obj)
    fetch('/api/v1/addPost', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    location.reload()
})
