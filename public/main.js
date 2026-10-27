let thumbUp = document.getElementsByClassName("fa-thumbs-up");
let thumbDown = document.getElementsByClassName("fa-thumbs-down");
let trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function (element) {
  element.addEventListener("click", function () {
   // const id =this.parentNode.parentNode.childNodes[1].dataset.messageId;
    // const name = this.parentNode.parentNode.childNodes[1].innerText
    // const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText);
    fetch("up", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // 'name': name,
        // 'msg': msg,
        thumbUp,
        id: element.dataset.id,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(thumbDown).forEach(function (element) {
  element.addEventListener("click", function () {
    // const id =this.parentNode.parentNode.childNodes[1].dataset.messageId;
    // const name = this.parentNode.parentNode.childNodes[1].innerText
    // const msg = this.parentNode.parentNode.childNodes[3].innerText
    // const thumbUp = parseFloat(
    //   this.parentNode.parentNode.childNodes[5].innerText,
    // );
    // const thumbDown = parseFloat(
    //   this.parentNode.parentNode.childNodes[6].innerText,
    // );
    console.log(element);

    fetch("down", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // 'name': name,
        // 'msg': msg,
        thumbUp: thumbUp,
        thumbDown: thumbDown,
        id: element.dataset.id,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    //const id =this.parentNode.parentNode.childNodes[1].dataset.messageId;
    // const name = this.parentNode.parentNode.childNodes[1].innerText;
    // const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("delete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: name,
        // msg: msg,
        id:element.dataset.id
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
