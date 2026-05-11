const chatToggle =
document.getElementById("chatToggle");

const chatContainer =
document.getElementById("chatContainer");

const closeChat =
document.getElementById("closeChat");

const sendBtn =
document.getElementById("sendBtn");

const chatInput =
document.getElementById("chatInput");

const chatBody =
document.getElementById("chatBody");

/* OPEN CHAT */

chatToggle.onclick = () => {

    chatContainer.style.display = "flex";
};

/* CLOSE CHAT */

closeChat.onclick = () => {

    chatContainer.style.display = "none";
};

/* SEND MESSAGE */

sendBtn.onclick = sendMessage;

chatInput.addEventListener(
    "keypress",
    function(e){

        if(e.key === "Enter"){

            sendMessage();
        }
    }
);

async function sendMessage(){

    const message =
    chatInput.value.trim();

    if(message === "") return;

    /* USER MESSAGE */

    const userDiv =
    document.createElement("div");

    userDiv.className =
    "user-message";

    userDiv.innerText =
    message;

    chatBody.appendChild(userDiv);

    chatInput.value = "";

    /* LOADING */

    const loadingDiv =
    document.createElement("div");

    loadingDiv.className =
    "bot-message";

    loadingDiv.innerHTML =
    "Typing...";

    chatBody.appendChild(loadingDiv);

    chatBody.scrollTop =
    chatBody.scrollHeight;

    try{

        const response =
        await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                message
            })
        });

        const data =
        await response.json();

        loadingDiv.innerHTML =
        data.reply;

    }catch(error){

        loadingDiv.innerHTML =
        "AI currently unavailable.";
    }

    chatBody.scrollTop =
    chatBody.scrollHeight;
}