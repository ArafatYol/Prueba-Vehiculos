const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM usuarios WHERE username = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error en el servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                rol: user.rol
            }
        });
    });
};

exports.register = async (req, res) => {
    const { username, password, nombre_completo, email, rol } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            username,
            password: hashedPassword,
            nombre_completo,
            email,
            rol: rol || 'usuario'
        };

        db.query('INSERT INTO usuarios SET ?', user, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: "El usuario o email ya existe" });
                }
                return res.status(500).json({ message: "Error al registrar usuario" });
            }

            res.status(201).json({
                message: "Usuario registrado exitosamente",
                userId: result.insertId
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};