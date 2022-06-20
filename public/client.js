const socket = io();
//taking client name as a input
let name1;
do {
  name1 = prompt("Please enter your name:");
} while (!name1);

let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value); //textarea is target
  }
});

function sendMessage(message) {
  let msg = {
    user: name1,
    message: message.trim(),
  };

  //append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}
// Recieve messages
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

////////////////////////////////////////////
// Basic emit
// The Socket.IO API is inspired from the Node.js EventEmitter, which means you can emit events on one side and register listeners on the other:

// Server

// io.on("connection", (socket) => {
//   socket.emit("hello", "world");
// });
// Client

// socket.on("hello", (arg) => {
//   console.log(arg); // world
// });
