let votos = 0;

const boton = document.getElementById("votar");
const textoVotos = document.getElementById("contador");

boton.addEventListener("click", function () {
    votos++;
    textoVotos.innerText = "Votos: " + votos;
});

let propuestas = [];

const form = document.getElementById("formPropuesta");
const carouselInner = document.getElementById("carouselInner");
mostrarMensajeVacio();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let idea = document.getElementById("idea").value.trim();
    let archivo = document.getElementById("imagen").files[0];

    if (nombre === "" || idea === "" || !archivo) {
        document.getElementById("mensaje").innerText = "Completa todos los campos";
        return;
    }

    let reader = new FileReader();

    reader.onload = function () {
        let nuevaPropuesta = {
            nombre: nombre,
            idea: idea,
            imagen: reader.result
        };

        propuestas.push(nuevaPropuesta);

        agregarCard(nuevaPropuesta);

        document.getElementById("mensaje").innerText = "Propuesta enviada ✅";

        document.getElementById("nombre").value = "";
        document.getElementById("idea").value = "";
        document.getElementById("imagen").value = "";
    };

    reader.readAsDataURL(archivo);
});


function agregarCard(propuesta) {

    if (carouselInner.children.length === 1 && 
    carouselInner.children[0].innerText.includes("Todavía no hay propuestas")) { carouselInner.innerHTML = ""; }

    let item = document.createElement("div");
    item.className = "carousel-item";

    if (carouselInner.children.length === 0) { item.classList.add("active"); }

    item.innerHTML = `
        <div class="card mx-auto" style="width: 24rem;">
            <img src="${propuesta.imagen}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${propuesta.idea}</h5>
                <p class="card-text">Propuesta de ${propuesta.nombre}</p>
                <button class="btn btn-primary">Apoyar</button>
            </div>
        </div>
    `;

    carouselInner.appendChild(item);
}

function mostrarMensajeVacio() {
    carouselInner.innerHTML = `
        <div class="carousel-item active">
            <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                <p class="text-center">Todavía no hay propuestas disponibles</p>
            </div>
        </div>
    `;
}