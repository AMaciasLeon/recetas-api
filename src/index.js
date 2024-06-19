const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const recetasRoutes = require('./routes/recetasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');

// Cargar variables de entorno desde .env
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB:', error.message));

const app = express();

// Middleware para analizar cuerpos de solicitud JSON
app.use(bodyParser.json());

// Rutas de la API
app.use('/api/recetas', recetasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/comentarios', comentariosRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Algo salió mal!' });
});

// Puerto para el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
