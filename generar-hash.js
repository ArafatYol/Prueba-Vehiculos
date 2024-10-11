const bcrypt = require('bcrypt');

async function generateHash() {
    const password = 'admin123'; // La contraseña que usarás
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Usa este hash en tu consulta SQL:', hashedPassword);
}

generateHash();