var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

// Sends a JSON request and returns the server's JSON response.
// Throws if the response isn't ok (401 not logged in, 400 bad id, 404 missing, 500),
// so a failed request is never treated as a success.
function sendRequest(action, method, url, body) {
  return fetch(url, {
    method: method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
  .then(response => {
    return response.json()
      .catch(() => null) // response body wasn't JSON
      .then(data => {
        if (!response.ok) {
          const reason = data && data.error ? data.error : response.statusText
          throw new Error(`${action} failed with ${response.status}: ${reason}`)
        }
        return data
      })
  })
}

// Each handler finds the clicked message's <li>, sends its data-id (the MongoDB _id),
// and shows the count the server sends back instead of reloading the page.
Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const li = this.closest('.message')
        sendRequest('Thumbs up', 'PUT', 'messages', {'id': li.dataset.id})
        .then(data => {
          li.querySelector('.thumbUpCount').innerText = data.thumbUp
        })
        .catch(err => console.error(err))
      });
});

Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const li = this.closest('.message')
        sendRequest('Thumbs down', 'PUT', 'messages/thumbDown', {'id': li.dataset.id})
        .then(data => {
          li.querySelector('.thumbDownCount').innerText = data.thumbDown
        })
        .catch(err => console.error(err))
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const li = this.closest('.message')
        sendRequest('Delete', 'DELETE', 'messages', {'id': li.dataset.id})
        .then(() => {
          // only remove the message once the server confirms the delete
          li.remove()
        })
        .catch(err => console.error(err))
      });
});
