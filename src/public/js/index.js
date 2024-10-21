const socket=io();

let user;
let chatBox = document.getElementById("chatBox")

Swal.fire({
    title:"Necesitas Identificarte",
    input:"text",
    text:"Ingresa un nombre de usuario para identificarte",
    inputValidator: (value)=> {
        return !value && "Necesitas escribir un nombre para continuar"
    },
    allowOutsideClick:false
}).then(result=>{
    user = result.value
})

chatBox.addEventListener("keyup",evt=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message",{user:user,message:chatBox.value});
            chatBox.value="";
        }
    }
})

//Socket listeners

socket.on("messageLogs",data=>{
    let log = document.getElementById("messageLogs")
    let messages = "";
    data.forEach(message =>{
        messages = messages+ `${message.user} dice: ${message.message} </br>`
    })
    log.innerHTML=messages;
})