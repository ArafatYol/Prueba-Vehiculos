const API_URL = 'http://localhost:3000/api/vehiculos';

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/views/login.html';
    }

    const btnMostrar = document.getElementById('mostrarVehiculos');
    btnMostrar.addEventListener('click', cargarVehiculos);

    // Configurar el token para todas las peticiones de Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
});

function cerrarSesion() {
    localStorage.removeItem('token');
    window.location.href = '/views/login.html';
}

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
            text: 'Error al cargar los vehículos ',
            icon: 'error'
        });
    }
} 