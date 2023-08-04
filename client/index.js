console.log("hello");

//after using scoket-clint side cdn
const socket = io("http://localhost:5000");


const messageform = document.querySelector(".chatbox form");
const messageList = document.querySelector("#messagelist");
const userList = document.querySelector("#users");
const chatboxinput = document.querySelector(".chatbox input");
const useraddform = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const useraddinput = document.querySelector(".modal input");




let messages=[];
let users=[];
//Socket Listener
//message is an in form of object
socket.on("message_client",(message)=>{
    messages.push(message);
    updateMessages();

})
//getting user from backend ie_users and assign in client side
socket.on("users",(_users)=>{
    users=_users;
    updateUser();
})



//Event Listeners
messageform.addEventListener("submit", messageSubmitHandler);

useraddform.addEventListener("submit",userAddHandler);


function messageSubmitHandler(e)
{
    e.preventDefault();
    let message = chatboxinput.value;

    if(!message){
        return alert("Message must not be empty");  
    }

    socket.emit("message",message);

    chatboxinput.value = "";

}

function updateMessages(){
  messageList.textContent="";
  //messages has object(look at consloe.log(messages[i])) of message to get message ; ,messages.message
   for(let i=0; i<messages.length;i++)
    {
        messageList.innerHTML+=`<li>
          <p>${messages[i].user}</p>
          <p>${messages[i].message}</p>
          </li>`
    }
  
}

function updateUser()
{
    userList.textContent="";
    for(let i=0;i<users.length;i++){

        let node=document.createElement("LI");
        let textnode = document.createTextNode(users[i]);
        node.appendChild(textnode);
        userList.appendChild(node);
    }

}
function userAddHandler(e)
{
    e.preventDefault();
    let username= useraddinput.value;
    if(!username){
        return alert("You must add a user name");
    }
    socket.emit("adduser" ,username);

    useraddform.classList.add("disappear");
    backdrop.classList.add("disappear");


}
