document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/api/auth/login', {
            username,
            password
        });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            window.location.href = '/views/principal.html';
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || 'Error al iniciar sesión',
            icon: 'error'
        });
    }
});