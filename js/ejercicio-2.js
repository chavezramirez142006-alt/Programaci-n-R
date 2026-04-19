//1. declarar un array con 5 lenguaje de programación
const lenguajes = ["python", "java", "javascript", "php", "c#"];

//2. capturar los elementos del dom
const lista = document.getElementById("lista");

let elementos = "";

//3. usamos el bucle for para recorrer un array
for (let i = 0; i < lenguajes.length; i++){
    if (lenguajes[i] === "javascrist"){
        alert("javascript sirve para el frontend y para el backend")
    }


    //4. ACUMULAMOS CADA LENUAJE DE LA ETIQUETAS
    elementos += "<li>" + lenguajes[i] + "</li>"; 
}

lista.innerHTML = elementos;