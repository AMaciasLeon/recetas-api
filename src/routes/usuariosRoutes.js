const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rutas para usuarios
router.post('/auth/login', usuariosController.iniciarSesion);
router.post('/auth/register', usuariosController.registrarUsuario);

module.exports = router;
