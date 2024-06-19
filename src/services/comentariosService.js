// src/services/comentariosService.js

const Comentario = require('../models/Comentario');

// Servicios para los comentarios

// Obtener todos los comentarios de una receta
async function obtenerComentariosPorReceta(idReceta) {
  try {
    const comentarios = await Comentario.find({ receta: idReceta });
    return comentarios;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Agregar un nuevo comentario a una receta
async function agregarComentarioAReceta(datosComentario) {
  const { texto, autor, receta } = datosComentario;

  try {
    const nuevoComentario = new Comentario({
      texto,
      autor,
      receta
    });

    const comentarioGuardado = await nuevoComentario.save();
    return comentarioGuardado;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  obtenerComentariosPorReceta,
  agregarComentarioAReceta
};
