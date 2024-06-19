const Receta = require('../models/Receta');

// Controlador para obtener todas las recetas
const obtenerTodasLasRecetas = async (req, res) => {
    try {
        const recetas = await Receta.find();
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para crear una nueva receta
const crearReceta = async (req, res) => {
    const nuevaReceta = new Receta({
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion,
        Ingredientes: req.body.Ingredientes,
        Instrucciones: req.body.Instrucciones,
        TiempoPreparacion: req.body.TiempoPreparacion,
        Dificultad: req.body.Dificultad,
        Etiquetas: req.body.Etiquetas,
        Autor: req.body.Autor,
    });

    try {
        const recetaGuardada = await nuevaReceta.save();
        res.status(201).json(recetaGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controlador para obtener una receta por su ID
const obtenerRecetaPorId = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);
        if (receta === null) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.json(receta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar una receta por su ID
const actualizarReceta = async (req, res) => {
    try {
        const recetaActualizada = await Receta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (recetaActualizada === null) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.json(recetaActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar una receta por su ID
const eliminarReceta = async (req, res) => {
    try {
        const recetaEliminada = await Receta.findByIdAndDelete(req.params.id);
        if (recetaEliminada === null) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.json({ message: 'Receta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para buscar recetas por lista de ingredientes
const buscarRecetasPorIngredientes = async (req, res) => {
    const ingredientes = req.query.ingredientes.split(',');
    try {
        const recetas = await Receta.find({ Ingredientes: { $all: ingredientes } });
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para buscar recetas por nivel de dificultad
const buscarRecetasPorDificultad = async (req, res) => {
    const nivel = req.params.nivel.toLowerCase();
    try {
        const recetas = await Receta.find({ Dificultad: nivel });
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener recetas por etiqueta
const obtenerRecetasPorEtiqueta = async (req, res) => {
    const etiqueta = req.params.etiqueta.toLowerCase();
    try {
        const recetas = await Receta.find({ Etiquetas: etiqueta });
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener las recetas mejor valoradas
const obtenerRecetasMejorValoradas = async (req, res) => {
    try {
        const recetas = await Receta.find().sort({ Puntuacion: -1 }).limit(10);
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener las recetas más recientes
const obtenerRecetasRecientes = async (req, res) => {
    try {
        const recetas = await Receta.find().sort({ FechaCreacion: -1 }).limit(10);
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    obtenerTodasLasRecetas,
    crearReceta,
    obtenerRecetaPorId,
    actualizarReceta,
    eliminarReceta,
    buscarRecetasPorIngredientes,
    buscarRecetasPorDificultad,
    obtenerRecetasPorEtiqueta,
    obtenerRecetasMejorValoradas,
    obtenerRecetasRecientes,
};
