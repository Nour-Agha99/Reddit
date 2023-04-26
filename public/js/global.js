const bodyOfPosts = document.querySelector('.lode-main-post')
const auther = window.location.href.split('/').slice(-1)[0]

const createAndAppendElement = (parent, elementType, classes = [], textContent = '') => {
    const element = document.createElement(elementType)
    element.textContent = textContent
    classes.forEach((className) => element.classList.add(className))
    parent.appendChild(element)
    return element
}

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

const createOnePost = (photo, userName, title, srcImg, time, id, totalVotes) => {
    const postSide = createAndAppendElement(bodyOfPosts, 'div', ['post-side'])
    postSide.id = id
    const likeDislike = createAndAppendElement(postSide, 'div', ['like-dislike'])
    createAndAppendElement(likeDislike, 'i', ['fa-regular', 'fa-square-caret-up', `up${id}`]).setAttribute('id', id)
    if (totalVotes === null) {
        totalVotes = 0
    }
    createAndAppendElement(likeDislike, 'p', [`count${id}`], totalVotes)
    createAndAppendElement(likeDislike, 'i', ['fa-regular', 'fa-square-caret-down', `down${id}`]).setAttribute('id', id)
    const mainPost = createAndAppendElement(postSide, 'div', ['main-post'])
    const postPart1 = createAndAppendElement(mainPost, 'div', ['post-part-1'])
    const person = createAndAppendElement(postPart1, 'div', ['person'])
    const img = createAndAppendElement(person, 'dev', ['personal'], '')
    img.style = `background-image: url(${checkPhotoProfile(photo)});background-size: cover;width: 45px;height: 45px;background-position: center;`
    createAndAppendElement(person, 'a', [], `r/${userName}`).setAttribute('href', `/sign/profile/${userName}`)
    createAndAppendElement(postPart1, 'span', [], `Posted by u/42words ${time} `)

    if (!auther) {
        const joinBtn = createAndAppendElement(postPart1, 'button', ['join-btn'])
        createAndAppendElement(joinBtn, 'i', ['fa-solid', 'fa-plus'])
        createAndAppendElement(joinBtn, 'a', [], 'Join').setAttribute('href', '/html/login.html')
    }

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

const resetTime = (creatAt) => {
    let theTime = ''
    const now = Date.now()
    const timesTamp = new Date(creatAt)
    const melSecond = now - timesTamp.getTime()
    const toSeconds = Math.floor(melSecond / (1000))
    const toMinutes = Math.floor(melSecond / (1000 * 60))
    const toHours = Math.floor(melSecond / (1000 * 60 * 60))

    if (melSecond < (1000 * 60)) {
        theTime = `${toSeconds} second ago `
    } else if (melSecond < (1000 * 60 * 60)) {
        theTime = `${toMinutes} minutes ago `
    } else if (melSecond < (1000 * 60 * 60 * 24)) {
        theTime = `${toHours} hours ago `
    } else {
        theTime = timesTamp.toISOString().slice(0, 10)
    }

    return theTime
}

const getAllPost = () => {
    fetch('/api/v1/allPosts', {
        method: 'GET',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'text/html'
        }
    }).then((data) => data.json()).then((data) => data.allData.reverse().forEach((post) => createOnePost(post.photo, post.username, post.title, post.body, resetTime(post.created_at), post.id, post.total_votes)))
}

getAllPost()
