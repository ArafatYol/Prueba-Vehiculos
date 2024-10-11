const db = require('../config/db');
const Vehiculo = require('../models/vehiculo');

// Obtener todos los vehículos
exports.getVehiculos = (req, res) => {
    db.query('SELECT * FROM vehiculos', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
};

// Obtener un vehículo específico
exports.getVehiculo = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM vehiculos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: 'Vehículo no encontrado' });
        res.status(200).json(results[0]);
    });
};

// Agregar un vehículo
exports.createVehiculo = (req, res) => {
    const { marca, modelo, anio, placa, estado } = req.body;
    const nuevoVehiculo = { marca, modelo, anio, placa, estado };

    db.query('INSERT INTO vehiculos SET ?', nuevoVehiculo, (err, results) => {
        if (err) {
            // Enviar un mensaje de error detallado
            return res.status(400).json({ error: "Error al ingresar los datos: " + err.sqlMessage });
        }
        res.status(201).json({ id: results.insertId, ...nuevoVehiculo });
    });
};

// Editar un vehículo
exports.updateVehiculo = (req, res) => {
    const { id } = req.params;
    const { marca, modelo, anio, placa, estado } = req.body;
    
    db.query('UPDATE vehiculos SET ? WHERE id = ?', [req.body, id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ id, marca, modelo, anio, placa, estado });
    });
};

// Eliminar un vehículo
exports.deleteVehiculo = (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM vehiculos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(204).send();
    });
};