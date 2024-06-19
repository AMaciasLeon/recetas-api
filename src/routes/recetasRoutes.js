const express = require('express');
const router = express.Router();
const recetasController = require('../controllers/recetasController');

// Rutas para recetas
router.get('/', recetasController.obtenerTodasLasRecetas);
router.post('/', recetasController.crearReceta);
router.get('/:id', recetasController.obtenerRecetaPorId);
router.put('/:id', recetasController.actualizarReceta);
router.delete('/:id', recetasController.eliminarReceta);
router.get('/buscar/ingredientes', recetasController.buscarRecetasPorIngredientes);
router.get('/buscar/dificultad/:nivel', recetasController.buscarRecetasPorDificultad);
router.get('/etiqueta/:etiqueta', recetasController.obtenerRecetasPorEtiqueta);
router.get('/mejor-valoradas', recetasController.obtenerRecetasMejorValoradas);
router.get('/recientes', recetasController.obtenerRecetasRecientes);

module.exports = router;
