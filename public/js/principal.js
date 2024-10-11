    function cerrarSesion() {
        // Eliminar el token del localStorage
        localStorage.removeItem('token');
        // Redirigir al login
        window.location.href = '/views/login.html';
    }

    // Verificar si el usuario está autenticado
    document.addEventListener('DOMContentLoaded', function() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/views/login.html';
        }
    });