// 1. Intentamos recuperar el conteo previo guardado en el navegador
let contador = localStorage.getItem("contador");

// 2. Si 'contador' tiene datos, lo convertimos a número entero.
// Si está vacío, inicia en 0.
contador = contador ? parseInt(contador) : 0;


// 3. Capturamos el elemento del HTML usando su ID
const conteo = document.getElementById("contador");

// 4. Mostramos el valor inicial en la pantalla
conteo.textContent = contador;


// 5. Función principal que suma o resta
function actualizarConteo(valor) {

    // Sumamos o restamos el valor al contador
    contador += valor;

    // Guardamos el nuevo valor en la memoria del navegador
    localStorage.setItem("contador", contador);

    // Actualizamos el número visible en la página
    conteo.textContent = contador;
}


// 6. Función para el botón REDUCIR
function reducir() {
    actualizarConteo(-1);
}


// 7. Función para el botón AUMENTAR
function aumentar() {
    actualizarConteo(1);
}


// 8. Función para el botón RESET
function reset() {
    contador = 0;
    localStorage.setItem("contador", contador);
    conteo.textContent = contador;
}