let votos = 0

const boton = document.getElementById("votar")
const textoVotos = document.getElementById("contador")

boton.addEventListener("click", function(){

votos = votos + 1

textoVotos.innerText = "Votos: " + votos

console.log("voto registrado")

})


const form = document.getElementById("formPropuesta")

form.addEventListener("submit", function(e){

let nombre = document.getElementById("nombre").value
let idea = document.getElementById("idea").value

if(nombre = "" || idea == ""){

document.getElementById("mensaje").innerText = "Completa todos los campos"

}

})

let propuestas = []

function guardarPropuestas(propuesta)
{
    propuestas.Push(propuesta)
}

function listaPropuestas()
{
    return propuestas;
}