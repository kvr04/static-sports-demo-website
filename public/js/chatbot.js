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

chatToggle.addEventListener(
    "click",
    () => {

        if(
            chatContainer.style.display
            === "flex"
        ){

            chatContainer.style.display =
            "none";

        }else{

            chatContainer.style.display =
            "flex";
        }
    }
);

/* CLOSE CHAT */

closeChat.addEventListener(
    "click",
    () => {

        chatContainer.style.display =
        "none";
    }
);

/* SEND BUTTON */

sendBtn.addEventListener(
    "click",
    sendMessage
);

/* ENTER KEY */

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

    /* BOT LOADING */

    const botDiv =
    document.createElement("div");

    botDiv.className =
    "bot-message";

    botDiv.innerHTML =
    "Typing...";

    chatBody.appendChild(botDiv);

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

        botDiv.innerHTML =
        formatResponse(data.reply);

    }catch(error){

        botDiv.innerHTML =
        "AI unavailable.";
    }

    chatBody.scrollTop =
    chatBody.scrollHeight;
}
function formatResponse(text){

    return text

    /* BOLD TEXT */

    .replace(
        /\*\*(.*?)\*\*/g,
        "<h3>$1</h3>"
    )

    /* NUMBER LIST */

    .replace(
        /(\d+\.)/g,
        "<br><b>$1</b>"
    )

    /* BULLET POINTS */

    .replace(
        /\*/g,
        "•"
    )

    /* LINE BREAKS */

    .replace(
        /\n/g,
        "<br>"
    );
}