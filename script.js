document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formPropuesta");
    const carouselInner = document.getElementById("carouselInner");

    mostrarMensajeVacio();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let nombre = document.getElementById("nombre").value.trim();
        let idea = document.getElementById("idea").value.trim();
        let archivoInput = document.getElementById("imagen");
        let archivo = archivoInput ? archivoInput.files[0] : null;
        let mensaje = document.getElementById("mensaje");

        console.log("nombre:", nombre);
        console.log("idea:", idea);
        console.log("archivo:", archivo);

        if (nombre === "" || idea === "" || !archivo) {

            mensaje.className = "mensaje mensaje-error";
            mensaje.innerText = "Completa todos los campos";
            return;
        }

        let reader = new FileReader();

        reader.onload = function () {
            let nuevaPropuesta = {
                nombre: nombre,
                idea: idea,
                imagen: reader.result,
                votos: 0 
            };

            agregarCard(nuevaPropuesta);

            mensaje.className = "mensaje mensaje-exito";
            mensaje.innerText = "Propuesta enviada correctamente";

            setTimeout(() => {
                mensaje.innerText = "";
            }, 3000);

            form.reset();
        };

        reader.readAsDataURL(archivo);
    });

    function agregarCard(propuesta) {
        
        let mensajeVacio = carouselInner.querySelector(".mensaje-vacio");
        if (mensajeVacio) {
            carouselInner.innerHTML = "";
        }

        let item = document.createElement("div");
        item.className = "carousel-item";

        if (carouselInner.children.length === 0) {
            item.classList.add("active");
        }

        item.innerHTML = `
            <div class="card mx-auto" style="width: 24rem;">
                <img src="${propuesta.imagen}" class="card-img-top" alt="imagen propuesta">
                <div class="card-body">
                    <h5 class="card-title">${propuesta.idea}</h5>
                    <p class="card-text">Propuesta de ${propuesta.nombre}</p>
                    <p class="votos-label">Votos: <span class="contador-votos">0</span></p>
                    <button class="btn btn-primary btn-apoyar">Apoyar</button>
                </div>
            </div>
        `;

        let botonApoyar = item.querySelector(".btn-apoyar");
        let contadorSpan = item.querySelector(".contador-votos");
        botonApoyar.addEventListener("click", function () {
            propuesta.votos++;
            contadorSpan.innerText = propuesta.votos;
        });

        carouselInner.appendChild(item);
    }

    function mostrarMensajeVacio() {
        carouselInner.innerHTML = `
            <div class="carousel-item active">
                <div class="mensaje-vacio d-flex justify-content-center align-items-center" style="height: 350px;">
                    <div class="text-center">
                        <h5>Todavía no hay propuestas</h5>
                        <p>¡Sé el primero en enviar una! 🎉</p>
                    </div>
                </div>
            </div>
        `;
    }

});

