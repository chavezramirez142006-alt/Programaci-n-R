// vamos a crear un OBJETO.
const estudiante = {
    // un mapa esta compuesto CLAVE Y VALOR
    nombre : "pepito",
    carrera : "informatica y desarrollo de aplicaciones web",
    ciclo : 3,
    // vamos a crear METODOS (son las acciones - verbos)
    estudiar : function(){
        console.log("pepito esta aprendiendo javascript.");
    } 
}

// ACCEDER AL OBJETO
console.log(estudiante.nombre);
estudiante.estudiar()

// vamos a crear un CONSTRUCTOR (simepre debe empezar con mayuscula)
function computadora(marca, procesador, ram,){
    // usamos atributos publicos usando this
    this.marca = marca;
    this.procesador = procesador;
    this.ram = ram;

    // cramos el metodo (acciones - verbos)
    this.encender = function(){
        console.log("iniciamos el sistema" + this.marca)
    }

    this.aumentarRam = function(){  
        return ram + "GB"

    }
 
    
}

// el operador new creea una instacia o copia a partir del modelo 
const PCLab1 = new computadora("HP", "Corei7", "32");
const PCLab2 = new computadora("Asus", "Corei5", "16");

console.log(PCLab1.marca);
console.log(PCLab1.ram);
console.log(PCLab1.procesador);

const mensaje = "tipos de datos javascript";

console.log(mensaje.length()); //contar el numero de carecteres
console.log(mensaje.trim());  // eliminar espaios 
console.log(mensaje.toUpperCase()); // convertir a mayuscula
console.log(mensaje.includes()); //verificar si existe una palabra o letra

const lenguajes = ["html", "css", "php", "javascript"];

lenguajes.push("java"); //push se agrega al final 
lenguajes.pop(); //elimina el ultimo
lenguajes.unshift("java"); //agrega al inicio
lenguajes.shift(); //elimina el primero
console.log (lenguajes.join("-")); //convierte el array en un string

