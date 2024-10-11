const API_URL = 'http://localhost:3000/api/vehiculos';
let vehiculoActual = null;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('actualizarForm');
    const select = document.getElementById('vehiculoSelect');

    cargarVehiculos();
    
    select.addEventListener('change', event => {
        const vehiculoId = event.target.value;
        if (vehiculoId) {
            cargarDatosVehiculo(vehiculoId);
        } else {
            document.getElementById('actualizarForm').style.display = 'none';
        }
    });

    form.addEventListener('submit', handleSubmit);
});

async function cargarVehiculos() {
    try {
        const response = await axios.get(API_URL);
        const vehiculos = response.data;
        const select = document.getElementById('vehiculoSelect');
        
        // Limpiar opciones existentes
        select.innerHTML = '<option value="">Seleccione un vehículo</option>';
        
        vehiculos.forEach(vehiculo => {
            const option = document.createElement('option');
            option.value = vehiculo.id;
            option.textContent = `${vehiculo.Marca} ${vehiculo.Modelo} - ${vehiculo.placa}`;
            select.appendChild(option);
        });
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al cargar los vehículos',
            icon: 'error'
        });
    }
}

async function cargarDatosVehiculo(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        vehiculoActual = response.data;
        
        // Mostrar el formulario
        document.getElementById('actualizarForm').style.display = 'flex';
        
        // Rellenar el formulario con los datos actuales
        document.getElementById('marca').value = vehiculoActual.Marca;
        document.getElementById('modelo').value = vehiculoActual.Modelo;
        document.getElementById('anio').value = vehiculoActual.anio;
        document.getElementById('placa').value = vehiculoActual.placa;
        document.getElementById('estado').value = vehiculoActual.estado;
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al cargar los datos del vehículo',
            icon: 'error'
        });
    }
}
// Configurar axios para incluir el token en todas las peticiones
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`; //esto ffue lo que

async function handleSubmit(e) {
    e.preventDefault();
    
    if (!vehiculoActual) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, seleccione un vehículo para actualizar',
            icon: 'error'
        });
        return;
    }

    const vehiculoActualizado = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        anio: document.getElementById('anio').value,
        placa: document.getElementById('placa').value,
        estado: document.getElementById('estado').value
    };

    try {
        await axios.put(`${API_URL}/${vehiculoActual.id}`, vehiculoActualizado);
        Swal.fire({
            title: '¡Éxito!',
            text: 'Vehículo actualizado correctamente',
            icon: 'success'
        });
        cargarVehiculos(); // Recargar la lista de vehículos
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.response?.data?.error || 'Error al actualizar el vehículo',
            icon: 'error'
        });
    }
}