const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const vehiculosRoutes = require('./routes/vehiculos');
const authRoutes = require('./routes/auth');  // Nueva línea
const auth = require('./middleware/auth');    // Nueva línea

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/views', express.static('views'));

// Rutas
app.use('/api/auth', authRoutes);           // Nueva ruta para autenticación
app.use('/api/vehiculos', auth, vehiculosRoutes);  // Proteger rutas de vehículos

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});