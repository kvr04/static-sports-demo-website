document.getElementById("sportForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        name:
        document.getElementById("name").value,

        age:
        document.getElementById("age").value,

        weight:
        document.getElementById("weight").value,

        sport:
        document.getElementById("sport").value,

        timing:
        document.getElementById("timing").value
    };

    const response = await fetch("/send-email",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)
    });

    const result = await response.text();

    alert(result);
});