const socket = io();

//Mensajes

const sendMessage = () => {
    const type = "usuario";
    const timestamp = new Date().toLocaleString();
    const email = document.getElementById("username").innerHTML;
    const messageBody = document.getElementById("text").value;
    console.log(messageBody)
    /* const message = { email, type, timestamp, messageBody }; */
    const message =  { type, email, timestamp, messageBody };
    console.log(message)
    socket.emit("newMessage", message);
    return false;
};

const showMessage = (message) => {
    const { type, email, timestamp, messageBody } = message;
    return `
        <div style="display:flex">
        <p>
            <strong style="color:blue">${type}</strong>
            <strong style="color:blue">${email}</strong>
            <span style="color:brown"> [${timestamp}] </span>
            <i style="color:green"> : ${messageBody}</i>
            </p>
        </div>
    `;
};

const addMessage = (messages) => {
  if (messages.length == 0)
  document.getElementById("messages"). innerHTML = `
    <h3 style="background-color:aquamarine; color:black">Aún no hay mensajes</h3><br>
  `;
  else { 
    const allMessages = messages.map(message => showMessage(message)).join(" ");
    document.getElementById("messages").innerHTML = allMessages;
    document.getElementById("text").value = '';
  }
};

socket.on('messages', (allMessages) => {
    addMessage(allMessages);
});