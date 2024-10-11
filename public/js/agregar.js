const API_URL = 'http://localhost:3000/api/vehiculos';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vehiculoForm');
    const btnMostrar = document.getElementById('mostrarVehiculos');

    form.addEventListener('submit', handleSubmit);
    btnMostrar.addEventListener('click', cargarVehiculos);
});

async function handleSubmit(e) {
    e.preventDefault();
    
    const vehiculo = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        anio: document.getElementById('anio').value,
        placa: document.getElementById('placa').value,
        estado: document.getElementById('estado').value
    };

    try {
        const response = await axios.post(API_URL, vehiculo);
        Swal.fire({
            title: '¡Éxito!',
            text: 'Vehículo agregado correctamente',
            icon: 'success'
        });
        document.getElementById('vehiculoForm').reset();
        cargarVehiculos();
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.response?.data?.error || 'Error al agregar el vehículo',
            icon: 'error'
        });
    }
}

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`; //esto ffue lo que agregue

async function cargarVehiculos() {
    try {
        const response = await axios.get(API_URL);
        const vehiculos = response.data;
        
        let tablaHTML = `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Año</th>
                    <th>Placa</th>
                    <th>Estado</th>
                </tr>
        `;
        
        vehiculos.forEach(vehiculo => {
            tablaHTML += `
                <tr>
                    <td>${vehiculo.id}</td>
                    <td>${vehiculo.Marca}</td>
                    <td>${vehiculo.Modelo}</td>
                    <td>${vehiculo.anio}</td>
                    <td>${vehiculo.placa}</td>
                    <td>${vehiculo.estado}</td>
                </tr>
            `;
        });
        
        tablaHTML += '</table>';
        document.getElementById('tablaVehiculos').innerHTML = tablaHTML;
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al cargar los vehículos',
            icon: 'error'
        });
    }
}