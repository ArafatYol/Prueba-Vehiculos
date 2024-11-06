// models/vehiculo.js
class Vehiculo {
    constructor(id, marca, modelo, anio, placa, estado) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.placa = placa;
        this.estado = estado;
    }
} // estados de mejora agregar mas diseño

module.exports = Vehiculo;