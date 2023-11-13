const thumbUp = document.querySelectorAll('.fa-thumbs-up')
const thumbDown = document.querySelectorAll('.fa-thumbs-down')
const trash = document.querySelectorAll('.fa-trash')

thumbUp.forEach(function (element) {
    element.addEventListener('click', function () {
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages/thumbUp', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, msg })
        })
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(data => {
            console.log(data)
            window.location.reload(true)
        })
    })
})

thumbDown.forEach(function (element) {
    element.addEventListener('click', function () {
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages/thumbDown', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, msg })
        })
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(data => {
            console.log(data)
            window.location.reload(true)
        })
    })
})

trash.forEach(function (element) {
    element.addEventListener('click', function () {
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ name, msg })
        })
        .then(function (response) {
            window.location.reload()
        })
    })
})