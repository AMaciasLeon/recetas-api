// src/services/usuariosService.js

const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key para firmar el token JWT
const secretKey = 'supersecretkey'; // En un entorno real, debería estar en una variable de entorno

// Registrar un nuevo usuario
async function registrarNuevoUsuario(datosUsuario) {
  const { nombreUsuario, correoElectronico, contraseña } = datosUsuario;

  try {
    // Verificar si el correo electrónico ya está registrado
    const usuarioExistente = await Usuario.findOne({ correoElectronico });
    if (usuarioExistente) {
      throw new Error('El correo electrónico ya está registrado');
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

    return usuarioGuardado;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Iniciar sesión de usuario y generar token JWT
async function iniciarSesionUsuario(correoElectronico, contraseña) {
  try {
    // Verificar si el usuario existe en la base de datos
    const usuario = await Usuario.findOne({ correoElectronico });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar si la contraseña proporcionada es correcta
    const contraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaCorrecta) {
      throw new Error('Contraseña incorrecta');
    }

    // Generar un token JWT válido por 1 hora
    const token = jwt.sign({ id: usuario._id }, secretKey, { expiresIn: '1h' });

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  registrarNuevoUsuario,
  iniciarSesionUsuario
};
