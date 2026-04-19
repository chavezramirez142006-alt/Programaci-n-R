//1. primer paso: capturamos elementos del DOM
//DOM: Modelos de objetos del documento (document object model)
//fase de entrada
const nombre = document.getElementById('nom');
const btnXD = document.getElementById('btn');
const mensaje = document.getElementById('mensaje');

//2. creamos la función
function registrar(){
    //registrando o capturando el dato desde el dom
    let nombre = nom.value;
    //mostramos en consola
    console.log("el nombre registrado en consola es: " + nombre);

    //3. mostrar todo en el dom 
    mensaje.textContent = "hola, " + nom.value + " bienvenido al curso";
}
