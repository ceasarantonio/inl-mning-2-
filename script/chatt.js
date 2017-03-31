window.addEventListener('load', function (event) {
  let btnLoggIn = document.getElementById('btnLoggIn');
  let btnSend = document.getElementById('btnSend');
  let chatText = document.getElementById('chattText');
  let userName = document.getElementById('userName');
  let btnLoggOut = document.getElementById('btnLoggOut');
  let body = document.getElementById('body');
  let chatTable = document.getElementById('chatTable');
  let btnVerify = document.getElementById('btnVerify');
  let h1 = document.createElement('h1');
  let provider = new firebase.auth.GithubAuthProvider();
  let btnHidden = document.getElementById('btnHidden');

  let user = '';
  btnSend.disabled = true;
  chatTable.style.visibility = "hidden";


  btnLoggIn.addEventListener('click', function (event) {
    user = userName.value;
    localStorage.setItem("userName", user);
    userName.value = '';
    btnLoggIn.disabled = true;
    btnLoggOut.disabled = false;
    btnSend.disabled = false;
    h1.innerHTML = `Välkommen ${user}`;
    body.insertBefore(h1, body.childNodes[0]);
  });

  btnLoggOut.addEventListener('click', function (event) {
    h1.innerHTML = `Logged Out ${user}`;
    localStorage.removeItem("userName");
    btnLoggOut.disabled = true;
    btnLoggIn.disabled = false;
    btnSend.disabled = true;
  });

  btnSend.addEventListener('click', function (event) {
    let message = {
      name: localStorage.getItem("userName"),
      text: chatText.value,
      timestamp: new Date().toLocaleTimeString()
    }
    chatTable.style.visibility = "visible";
    let rt = document.createElement('tr');
    rt.innerHTML = "<td>" + message.name + "<td>" + message.text + "<td>" + message.timestamp;
    chatTable.appendChild(rt);
    firebase.database().ref('chattLogg/').push(message);
    chatText.value = '';

  })
  firebase.database().ref('chattLogg/').on('value', function (snapshot) {
    //console.log('Laddat nya meddelande');
    snapshot.forEach(messageRef => {
      let messageObject = messageRef.val();
      // console.log('Innehåll ', messageObject)


    })
  });

});
