const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para comentarios
router.get('/receta/:id', comentariosController.obtenerComentariosPorReceta);
router.post('/receta/:id', authMiddleware, comentariosController.agregarComentario);

module.exports = router;
