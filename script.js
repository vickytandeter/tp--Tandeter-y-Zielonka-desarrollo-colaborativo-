document.addEventListener("DOMContentLoaded", function () {

    let votos = 0;

    const boton = document.getElementById("votar");
    const textoVotos = document.getElementById("contador");

    const form = document.getElementById("formPropuesta");
    const carouselInner = document.getElementById("carouselInner");

    let propuestas = [];

    mostrarMensajeVacio();

    boton.addEventListener("click", function () {
        votos++;
        textoVotos.innerText = "Votos: " + votos;
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let nombre = document.getElementById("nombre").value.trim();
        let idea = document.getElementById("idea").value.trim();
        let archivo = document.getElementById("imagen").files[0];


        if (nombre === "" || idea === "" || !archivo) {
            document.getElementById("mensaje").innerText = "Completa todos los campos";
            return;
        }

        if (!archivo) {
            let nuevaPropuesta = {
                nombre: nombre,
                idea: idea,
                imagen: "img/img.jpg"
            };

            propuestas.push(nuevaPropuesta);
            agregarCard(nuevaPropuesta);
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
        };

        reader.readAsDataURL(archivo);
    });

    function agregarCard(propuesta) {

        if (!hayPropuestas) {
            carouselInner.innerHTML = "";
            hayPropuestas = true;
        }

        let item = document.createElement("div");
        item.className = "carousel-item";

        if (carouselInner.children.length === 0) {
            item.classList.add("active");
        }

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
        hayPropuestas = false;

        carouselInner.innerHTML = `
            <div class="carousel-item active">
                <div class="d-flex justify-content-center align-items-center" style="height: 350px;">
                    <div class="text-center">
                        <h5>Todavía no hay propuestas</h5>
                        <p>¡Sé el primero en enviar una! 🎉</p>
                    </div>
                </div>
            </div>
        `;
    }

});