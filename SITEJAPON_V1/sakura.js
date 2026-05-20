const container = document.getElementById("sakura-container");

const TOTAL_PETALS = window.innerWidth < 768 ? 40 : 80;
const LIFE_TIME = 4000;

for (let i = 0; i < TOTAL_PETALS; i++) {
    setTimeout(createPetal, i * 25);
}

function createPetal() {
    const petal = document.createElement("img");
    petal.src = "image/sakura.png";
    petal.className = "sakura";

    const size = 40 + Math.random() * 30;
    petal.style.width = size + "px";

    let rotation = Math.random() * 360;
    const endX = 45 + Math.random() * 20;
    const endY = 45 + Math.random() * 20;
    const wind = (Math.random() - 0.5) * 250;

    container.appendChild(petal);

    let start = null;

    function animate(time) {
        if (!start) start = time;
        const progress = (time - start) / LIFE_TIME;

        if (progress >= 1) {
            petal.remove();
            return;
        }

        const x =
            progress * (window.innerWidth * endX / 100) +
            Math.sin(progress * 10) * wind;

        const y =
            progress * progress * (window.innerHeight * endY / 100);

        rotation += 2;

        petal.style.transform = `
            translate(${x}px, ${y}px)
            rotate(${rotation}deg)
        `;

        petal.style.opacity =
            progress < 0.1 ? progress * 10 :
            progress > 0.9 ? (1 - progress) * 10 : 1;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
