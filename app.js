const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// --- 1. CONFIGURACIÓN DE BASE DE DATOS ---
mongoose.connect('mongodb://127.0.0.1:27017/laboratorio_pro')
  .then(() => console.log('✅ Conexión a MongoDB exitosa'))
  .catch(err => console.error('❌ Error de conexión:', err));

// --- 2. MIDDLEWARES ESENCIALES (El traductor de datos) ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Estas dos líneas permiten que el servidor lea los datos del formulario de Login
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 3. CONFIGURACIÓN DE SESIÓN (La cerradura) ---
app.use(session({
  secret: 'clave_maestra_segura_123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

// --- 4. MIDDLEWARE DE PROTECCIÓN ---
// Esto impide que alguien entre a la interfaz sin estar logueado
const protegerVista = (req, res, next) => {
  if (req.session && req.session.usuarioLogueado) {
    next();
  } else {
    res.redirect('/login');
  }
};

// --- 5. DEFINICIÓN DE RUTAS ---

// Ruta de Login (Muestra el formulario)
app.get('/login', (req, res) => {
  res.render('login'); 
});

// Ruta para procesar el Login (Verifica credenciales)

app.post('/auth', async (req, res) => {
  // ... anterior
  const user = await Usuario.findOne({ username }); // Busca solo por usuario
  if (user && user.password === password) { // usar bcrypt.compare
      
  }
  
});

    // DEBUG: Esto  dirá en la consola qué está llegando del formulario
    console.log(`🔍 Intento de acceso - Usuario: ${username}, Clave: ${password}`);

    // Buscamos en la base de datos
    const user = await Usuario.findOne({ username, password });

    if (user) {
      console.log('✅ Usuario validado con éxito');
      req.session.usuarioLogueado = true;
      req.session.nombreUsuario = user.username;
      res.redirect('/');
    } else {
      console.log('❌ Credenciales incorrectas');
      res.send(`
        <script>
          alert("Acceso denegado: Usuario o clave incorrecta");
          window.location.href = "/login";
        </script>
      `);
    }
  } catch (err) {
    console.error("Error en auth:", err);
    res.status(500).send("Error interno del servidor");
  }
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Ruta Principal PROTEGIDA (Usa el middleware)
app.get('/', protegerVista, (req, res) => {
  res.render('index');
});

// Rutas de la API (También protegidas)
app.use('/api', apiRoutes);

// --- 6. LANZAMIENTO DEL SERVIDOR ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
  🚀 LAB-SYSTEM ACTIVO
  -----------------------------------------
  🔗 URL: http://localhost:3000
  🛡️ Seguridad: Activa (Sesiones Express)
  📦 DB: MongoDB (laboratorio_pro)
  -----------------------------------------
  `);
});