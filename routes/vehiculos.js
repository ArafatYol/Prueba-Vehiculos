const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculosController');

// Rutas
router.get('/', vehiculosController.getVehiculos);
router.get('/:id', vehiculosController.getVehiculo); // Nueva ruta
router.post('/', vehiculosController.createVehiculo);
router.put('/:id', vehiculosController.updateVehiculo);
router.delete('/:id', vehiculosController.deleteVehiculo);

module.exports = router;