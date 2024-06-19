// src/services/recetasService.js

const Receta = require('../models/Receta');

// Servicios para las recetas

// Obtener todas las recetas
async function obtenerTodasLasRecetas() {
  try {
    const recetas = await Receta.find();
    return recetas;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Obtener una receta por su ID
async function obtenerRecetaPorId(idReceta) {
  try {
    const receta = await Receta.findById(idReceta);
    return receta;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Crear una nueva receta
async function crearNuevaReceta(datosReceta) {
  try {
    const nuevaReceta = new Receta(datosReceta);
    const recetaGuardada = await nuevaReceta.save();
    return recetaGuardada;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Actualizar una receta existente
async function actualizarReceta(idReceta, datosReceta) {
  try {
    const recetaActualizada = await Receta.findByIdAndUpdate(idReceta, datosReceta, { new: true });
    return recetaActualizada;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Eliminar una receta
async function eliminarReceta(idReceta) {
  try {
    const recetaEliminada = await Receta.findByIdAndDelete(idReceta);
    return recetaEliminada;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  obtenerTodasLasRecetas,
  obtenerRecetaPorId,
  crearNuevaReceta,
  actualizarReceta,
  eliminarReceta
};
