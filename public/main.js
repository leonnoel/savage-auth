let thumbUpIcon = document.getElementsByClassName("fa-thumbs-up");
let thumbdDownIcon = document.getElementsByClassName("fa-thumbs-down");
let trashIcon = document.getElementsByClassName("fa-trash");

Array.from(thumbUpIcon).forEach(function (element) {
  element.addEventListener('click', function () {
    const dataSetID = this.parentNode.parentNode.childNodes[1].dataset.msgId
    console.log(dataSetID)
    const counter = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('counterIncrease', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'counter': counter,
        'quoteID': dataSetID
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        // Use DOM to .removeChild
        window.location.reload(true)
      })
  });
});

Array.from(thumbdDownIcon).forEach(function (element) {
  element.addEventListener('click', function () {
    const dataSetID = this.parentNode.parentNode.childNodes[1].dataset.msgId
    const counter = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('counterDecrease', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'counter': counter,
        'quoteID': dataSetID
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(trashIcon).forEach(function (element) {
  element.addEventListener('click', function () {
    const dataSetID = this.parentNode.parentNode.childNodes[1].dataset.msgId
    // const name = this.parentNode.parentNode.childNodes[1].innerText
    // const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('deleteQuote', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // 'name': name,
        // 'msg': msg,
        'quoteID': dataSetID
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
