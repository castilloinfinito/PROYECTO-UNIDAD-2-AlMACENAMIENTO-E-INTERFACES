// definicion primarias de constantes 

const express = require('express');
const path = require('path');
const conectarDB = require('./database/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Conectar a Mongo
conectarDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => res.render('index'));
app.use('/api', apiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en: http://localhost:${PORT}`);
});