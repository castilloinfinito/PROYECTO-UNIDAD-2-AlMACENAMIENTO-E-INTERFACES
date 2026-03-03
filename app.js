const express = require('express');
const path = require('path');

// Intentamos cargar la configuración de la base de datos y rutas
let conectarDB;
let apiRoutes;

try {
    conectarDB = require('./database/db');
    apiRoutes = require('./routes/apiRoutes');
} catch (err) {
    console.error("❌ ERROR CRÍTICO DE IMPORTACIÓN:");
    console.error("Asegúrate de que las carpetas 'database' y 'routes' existan.");
    console.error(err.message);
}

const app = express();

// --- CONFIGURACIÓN DE MIDDLEWARES ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, imágenes) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
// middleware de sesión
const session = require('express-session');

app.use(session({
  secret: 'clave_secreta_laboratorio', // Cambia esto por algo difícil
  resave: false,
  saveUninitialized: false
}));

// Middleware para proteger la interfaz
const protegerVista = (req, res, next) => {
  if (req.session.usuarioLogueado) {
    next();
  } else {
    res.redirect('/login'); // Si no hay sesión, al login
  }
};


// --- CONFIGURACIÓN DE VISTAS (EJS) ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- CONEXIÓN A MONGODB ---
if (conectarDB) {
    conectarDB();
}

// --- DEFINICIÓN DE RUTAS ---

// 1. Ruta para la Interfaz Web (Frontend)
// 1. Ruta de Login (Para mostrar el formulario de entrada)
app.get('/login', (req, res) => {
  res.render('login'); // Necesitaremos crear login.ejs
});

// 2. Ruta para procesar el Login
app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  const { Usuario } = require('./models/LaboratorioModels');
  
  const user = await Usuario.findOne({ username, password });
  
  if (user && user.rol === 'Admin') {
    req.session.usuarioLogueado = true;
    res.redirect('/');
  } else {
    res.send('Acceso denegado: Usuario o clave incorrecta');
  }
});

// 3. Proteger la ruta principal (Añadimos 'protegerVista')
app.get('/', protegerVista, (req, res) => {
  res.render('index');
});


// 2. Rutas de la API (Backend para Thunder Client)
if (apiRoutes) {
    app.use('/api', apiRoutes);
} else {
    console.log("⚠️ Advertencia: Las rutas de la API no están cargadas.");
}

// --- INICIO DEL SERVIDOR ---
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log("==============================================");
    console.log(`🚀 LAB-SYSTEM ACTIVO: http://localhost:${PORT}`);
    console.log(`📂 Directorio: ${__dirname}`);
    console.log("==============================================");
});

// Manejo de errores del servidor (ej. puerto ocupado)
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ El puerto ${PORT} ya está siendo usado por otro programa.`);
    } else {
        console.error("❌ Error al iniciar el servidor:", error.message);
    }
});