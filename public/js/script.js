document
.getElementById("sportForm")

.addEventListener("submit",

async function(e){

    e.preventDefault();

    const submitBtn =
    document.getElementById(
        "submitBtn"
    );

    const btnText =
    document.getElementById(
        "btnText"
    );

    const loader =
    document.getElementById(
        "loader"
    );

    /* =========================
       BUTTON LOADING STATE
    ========================= */

    submitBtn.disabled = true;

    btnText.innerText =
    "Submitting...";

    loader.classList.remove(
        "hidden"
    );

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

    try{

        const response =
        await fetch("/send-email",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)
        });

        const result =
        await response.text();

        /* =========================
           SUCCESS
        ========================= */

        btnText.innerText =
        "Success ✓";

        loader.classList.add(
            "hidden"
        );

        submitBtn.style.background =
        "linear-gradient(135deg,#00ff99,#00cc66)";

        alert(result);

        /* RESET FORM */

        document
        .getElementById(
            "sportForm"
        )
        .reset();

        setTimeout(()=>{

            submitBtn.disabled = false;

            btnText.innerText =
            "Join Academy";

            submitBtn.style.background =
            "linear-gradient(135deg,#00e5ff,#7c4dff,#ff4fd8)";

        },2000);

    }catch(error){

        /* =========================
           ERROR
        ========================= */

        console.log(error);

        btnText.innerText =
        "Try Again";

        loader.classList.add(
            "hidden"
        );

        submitBtn.disabled = false;

        alert(
            "Error submitting form"
        );
    }
});