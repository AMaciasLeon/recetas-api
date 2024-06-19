const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
async function registrarUsuario(req, res) {
  const { nombreUsuario, correoElectronico, contraseña } = req.body;

  try {
    // Verificar si el correo electrónico ya está registrado
    const usuarioExistente = await Usuario.findOne({ correoElectronico });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({
      nombreUsuario,
      correoElectronico,
      contraseña: hashedPassword
    });

    // Guardar el nuevo usuario en la base de datos
    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

// Iniciar sesión de usuario
async function iniciarSesion(req, res) {
  const { correoElectronico, contraseña } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const usuario = await Usuario.findOne({ correoElectronico });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña proporcionada es correcta
    const contraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaCorrecta) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar un token JWT válido por 1 hora usando la variable de entorno SECRET_KEY
    const token = jwt.sign({ id: usuario._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

module.exports = {
  registrarUsuario,
  iniciarSesion
};
