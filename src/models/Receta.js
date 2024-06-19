const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Descripcion: { type: String, required: true },
  Ingredientes: { type: [String], required: true },
  Instrucciones: { type: String, required: true },
  TiempoPreparacion: { type: Number, required: true },
  Dificultad: { type: String, required: true },
  Etiquetas: { type: [String], required: true },
  Autor: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Receta', recetaSchema);
