// Vamos a crear un CONSTRUCTOR (Empieza con mayúscula)
function EquipoSoporte(tipo, marca, estado){

    // Atributos públicos
    this.tipo = tipo;
    this.marca = marca;
    this.estado = estado;

    // Atributo PRIVADO
    let codigoInventario = Math.floor(Math.random() * 1000);

    // Método que imprime un reporte del equipo
    this.reporte = function(){
        console.log("Tipo: " + this.tipo);
        console.log("Marca: " + this.marca);
        console.log("Estado: " + this.estado);
    }

    // Método privilegiado para ver el código oculto
    this.verCodigo = function(){
        return codigoInventario;
    }

}

// El operador NEW crea una instancia
const equipo1 = new EquipoSoporte("Proyector", "Epson", "Operativo");
const equipo2 = new EquipoSoporte("Router", "TP-Link", "Operativo");
const equipo3 = new EquipoSoporte("Laptop", "HP", "Malogrado");

// Guardamos los equipos en un ARRAY
const inventario = [equipo1, equipo2, equipo3];

// Mostrar reporte de cada equipo
inventario.forEach(function(equipo){

    console.log("----- REPORTE -----");
    equipo.reporte();

    // Método de string
    console.log("Marca en MAYÚSCULA: " + equipo.marca.toUpperCase());

});

// Acceder al código privado con el método privilegiado
console.log("Codigo Inventario Equipo 1: " + equipo1.verCodigo());