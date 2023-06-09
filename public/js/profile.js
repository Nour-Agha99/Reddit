const personalImg = document.querySelector('.per-photo .img')
const listBar = document.querySelector('.settings-menu-inner')
const ownPosts = document.querySelector('.container')
const personalImage = document.querySelectorAll('.img')
const personalName = document.querySelectorAll('.user-title')
const userPhoto = document.querySelector('.left-side .photo')
const userName = document.querySelector('.left-side .username')
const userEmail = document.querySelector('.left-side .email')
const theUser = window.location.href.split('/').slice(-1)[0].replace(/%20/, ' ')

const createAndAppendElement = (parent, elementType, classes = [], textContent = '') => {
    const element = document.createElement(elementType)
    element.textContent = textContent
    classes.forEach((className) => element.classList.add(className))
    parent.appendChild(element)
    return element
}

personalImg.addEventListener('click', (event) => {
    event.stopPropagation()
    listBar.classList.toggle('active')
})

document.addEventListener('click', (event) => {
    if (!listBar.contains(event.target)) {
        listBar.classList.remove('active')
    }
})

const checkPhotoProfile = (photo) => {
    if (!photo) {
        photo = 'https://i.pinimg.com/564x/e3/14/78/e314783e36874ac65a7795890bf22c4a.jpg'
        return photo
    } else if ((photo.toString().endsWith('.jpg') || photo.toString().endsWith('.png') || photo.toString().endsWith('.jpeg'))) {
        return photo
    } else {
        photo = 'https://i.pinimg.com/564x/e3/14/78/e314783e36874ac65a7795890bf22c4a.jpg'
        return photo
    }
}

const createOnePost = (photo, userName, title, srcImg, time) => {
    const postSide = createAndAppendElement(ownPosts, 'div', ['post-side'])
    const likeDislike = createAndAppendElement(postSide, 'div', ['like-dislike'])
    createAndAppendElement(likeDislike, 'i', ['fa-regular', 'fa-square-caret-up'])
    createAndAppendElement(likeDislike, 'p', [], '27.5K')
    createAndAppendElement(likeDislike, 'i', ['fa-regular', 'fa-square-caret-down'])
    const mainPost = createAndAppendElement(postSide, 'div', ['main-post'])
    const postPart1 = createAndAppendElement(mainPost, 'div', ['post-part-1'])
    const person = createAndAppendElement(postPart1, 'div', ['person'])
    const img = createAndAppendElement(person, 'dev', ['personal'], '')
    img.style = `background-image: url(${checkPhotoProfile(photo)});`
    createAndAppendElement(person, 'a', [], `r/${userName}`).setAttribute('href', `/sign/profile/${userName}`)
    createAndAppendElement(postPart1, 'span', [], `Posted by u/42words ${time} `)
    const postPart2 = createAndAppendElement(mainPost, 'div', ['post-part-2'])
    createAndAppendElement(postPart2, 'p', [], title)

    if (srcImg.endsWith('.jpg')) {
        const postPart3 = createAndAppendElement(mainPost, 'div', ['post-part-3'])
        createAndAppendElement(postPart3, 'img', [], '').setAttribute('src', srcImg)
    } else {
        const postLink = createAndAppendElement(postPart2, 'span', [])
        createAndAppendElement(postLink, 'a', [], srcImg.slice(0, 50)).setAttribute('href', srcImg)
        createAndAppendElement(postLink, 'i', ['fa-solid', 'fa-external-link'])
    }

    const postPart4Div = createAndAppendElement(mainPost, 'div', ['post-part-4'])
    const commentCountP = createAndAppendElement(postPart4Div, 'p', [], '3.3K Comments')
    createAndAppendElement(commentCountP, 'i', ['fa-solid', 'fa-comment-alt'])
    const shareP = createAndAppendElement(postPart4Div, 'p', [], 'Share')
    createAndAppendElement(shareP, 'i', ['fa-solid', 'fa-share'])
    const saveP = createAndAppendElement(postPart4Div, 'p', [], 'Save')
    createAndAppendElement(saveP, 'i', ['fa-solid', 'fa-bookmark'])
    const ellipsisP = createAndAppendElement(postPart4Div, 'p', [])
    createAndAppendElement(ellipsisP, 'i', ['fa-solid', 'fa-ellipsis-h'])
}

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

const resetTime = (creatAt) => {
    let theTime = ''
    const now = Date.now()
    const timesTamp = new Date(creatAt)
    const melSecond = now - timesTamp.getTime()
    const toMinutes = Math.floor(melSecond / (1000 * 60))
    const toHours = Math.floor(melSecond / (1000 * 60 * 60))

    if (melSecond < (1000 * 60 * 60)) {
        theTime = `${toMinutes} minutes ago `
    } else if (melSecond < (1000 * 60 * 60 * 24)) {
        theTime = `${toHours} hours ago `
    } else {
        theTime = timesTamp.toISOString().slice(0, 10)
    }

    return theTime
}

fetch(`/api/v1/profile/${theUser}`, {
    method: 'GET',
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'text/html'
    }
}).then((data) => data.json()).then((data) => data.data).then((data) => {
    userPhoto.style = `background-image: url(${checkPhotoProfile(data[0].photo)});`
    userName.textContent = data[0].username
    userEmail.textContent = data[0].email
    data.reverse().forEach((post) => createOnePost(post.photo, post.username, post.title, post.body, resetTime(post.created_at)))
})
