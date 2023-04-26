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
        // eslint-disable-next-line no-undef
        const checkImg = checkPhotoProfile(data.user.photo)
        image.style = `background-image: url(${checkImg});`
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

const upDownVote = (postId, vote) => {
    const data = { postId, vote }
    fetch('/api/v1/addVote', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((result) => result.json()).then((result) => {
        if (result.message === 'you are voted before') {
            fetch('/api/v1/editVote', {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
    }
    )
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-square-caret-up')) {
        const idOfPost = event.target.id
        upDownVote(idOfPost, 1)

        if (!event.target.classList.contains('active-up')) {
            const count = parseInt(document.querySelector(`p.count${idOfPost}`).textContent)
            document.querySelector(`p.count${idOfPost}`).textContent = count + 1
        }

        document.querySelector(`.fa-square-caret-up.up${idOfPost}`).classList.add('active-up')
        document.querySelector(`.fa-square-caret-down.down${idOfPost}`).classList.remove('active-down')
    }

    if (event.target.classList.contains('fa-square-caret-down')) {
        const idOfPost = event.target.id
        upDownVote(idOfPost, 0)

        if (!event.target.classList.contains('active-down')) {
            const count = parseInt(document.querySelector(`p.count${idOfPost}`).textContent)
            document.querySelector(`p.count${idOfPost}`).textContent = count - 1
        }

        document.querySelector(`.fa-square-caret-up.up${idOfPost}`).classList.remove('active-up')
        document.querySelector(`.fa-square-caret-down.down${idOfPost}`).classList.add('active-down')
    }
})

fetch('/api/v1/getVote', {
    method: 'GET',
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'text/html'
    }
}).then((data) => data.json()).then((data) => {
    data.allData.forEach((vote) => {
        if (vote.vote === 1) {
            document.querySelector(`.up${vote.post_id}`).classList.add('active-up')
        } else if (vote.vote === 0) {
            document.querySelector(`.down${vote.post_id}`).classList.add('active-down')
        }
    })
})
