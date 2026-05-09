/* =========================
   HERO TEXT TYPING EFFECT
========================= */

const heroTitle =
document.querySelector(".hero h1");

if(heroTitle){

    const text =
    "Future Sports Academy";

    let index = 0;

    heroTitle.innerHTML = "";

    function typeEffect(){

        if(index < text.length){

            heroTitle.innerHTML +=
            text.charAt(index);

            index++;

            setTimeout(typeEffect,100);
        }
    }

    typeEffect();
}

/* =========================
   CARD REVEAL ANIMATION
========================= */

const cards =
document.querySelectorAll(".card");

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add(
                "show-card"
            );
        }
    });

},{
    threshold:0.2
});

cards.forEach((card)=>{

    observer.observe(card);
});

/* =========================
   FLOATING PARTICLES
========================= */

const body =
document.querySelector("body");

for(let i=0;i<25;i++){

    const particle =
    document.createElement("div");

    particle.classList.add(
        "particle"
    );

    particle.style.left =
    Math.random()*100 + "vw";

    particle.style.animationDuration =
    Math.random()*10 + 5 + "s";

    particle.style.width =
    particle.style.height =
    Math.random()*8 + 3 + "px";

    body.appendChild(particle);
}

/* =========================
   MOUSE GLOW EFFECT
========================= */

const glow =
document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener(
    "mousemove",
    (e)=>{

    glow.style.left =
    e.pageX - 100 + "px";

    glow.style.top =
    e.pageY - 100 + "px";
});