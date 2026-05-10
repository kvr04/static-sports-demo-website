const sendBtn =
document.getElementById("sendBtn");

const userInput =
document.getElementById("userInput");

const chatBox =
document.getElementById("chatBox");

sendBtn.addEventListener(
    "click",
    async ()=>{

    const message =
    userInput.value;

    if(!message) return;

    /* USER MESSAGE */

    chatBox.innerHTML += `
    <div class="message user-message">
        ${message}
    </div>
    `;

    userInput.value = "";

    /* LOADING */

    chatBox.innerHTML += `
    <div class="message bot-message" id="loading">
        Thinking...
    </div>
    `;

    chatBox.scrollTop =
    chatBox.scrollHeight;

    try{

        const response =
        await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message
            })
        });

        const data =
        await response.json();

        document
        .getElementById("loading")
        .remove();

        chatBox.innerHTML += `
        <div class="message bot-message">
            ${data.reply}
        </div>
        `;

        chatBox.scrollTop =
        chatBox.scrollHeight;

    }catch(error){

        console.log(error);
    }
});