const API_URL = 'http://localhost:3000/api/vehiculos';

document.addEventListener('DOMContentLoaded', () => {
    cargarVehiculos();
});

async function cargarVehiculos() {
    try {
        const response = await axios.get(API_URL);
        const vehiculos = response.data;
        const tableBody = document.querySelector('#vehiculosTable tbody');
        
        tableBody.innerHTML = '';
        
        vehiculos.forEach(vehiculo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehiculo.id}</td>
                <td>${vehiculo.Marca}</td>
                <td>${vehiculo.Modelo}</td>
                <td>${vehiculo.anio}</td>
                <td>${vehiculo.placa}</td>
                <td>${vehiculo.estado}</td>
                <td>
                    <button onclick="eliminarVehiculo(${vehiculo.id})" class="btn-eliminar">
                        Eliminar
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al cargar los vehículos',
            icon: 'error'
        });
    }
}

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`; //esto ffue lo que agregue

async function eliminarVehiculo(id) {
    try {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await axios.delete(`${API_URL}/${id}`);
            Swal.fire(
                '¡Eliminado!',
                'El vehículo ha sido eliminado.',
                'success'
            );
            cargarVehiculos(); // Recargar la tabla
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al eliminar el vehículo',
            icon: 'error'
        });
    }
}