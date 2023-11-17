require('dotenv').config();
const jwt = require('jsonwebtoken');

const vrc = (req, res, next) => {
    const { email, password, rol, lenguage } = req.body;
    if (!email || !password || !rol || !lenguage) {
        console.log('Todos los campos son obligatorios')
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    console.log('Credenciales ingresadas con exito');
    next();
}

const vlc = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Todos los campos son obligatorios')
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    console.log('Credenciales ingresadas con exito');
    next();
}

const vtc = (req, res, next) => {
    try {
        const Authorization = req.header('Authorization');
        if(!Authorization) {
            return res.status(401).json({ mensaje: 'Token no existe' });
        }
        const token = Authorization.split("Bearer ")[1];
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.data = verifyToken;
        console.log('Token verificado exitosamente');
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
}

module.exports = {
    vrc,
    vlc,
    vtc
}