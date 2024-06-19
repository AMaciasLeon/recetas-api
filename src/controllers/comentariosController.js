const Comentario = require('../models/Comentario');

// Controladores para los comentarios

// Obtener todos los comentarios de una receta
async function obtenerComentariosPorReceta(req, res) {
  const idReceta = req.params.id;
  try {
    const comentarios = await Comentario.find({ receta: idReceta });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

// Agregar un nuevo comentario a una receta
async function agregarComentario(req, res) {
  const { texto, autor } = req.body;
  const idReceta = req.params.id;

  try {
    const nuevoComentario = new Comentario({
      texto,
      autor,
      receta: idReceta
    });

    const comentarioGuardado = await nuevoComentario.save();
    res.status(201).json(comentarioGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

module.exports = {
  obtenerComentariosPorReceta,
  agregarComentario
};
