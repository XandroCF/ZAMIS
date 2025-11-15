// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rate limit básico
const limiter = rateLimit({ windowMs: 60*1000, max: 120 });
app.use(limiter);

// Rutas públicas (static frontend)
app.use('/', express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/contactos', require('./routes/contactos'));
app.use('/api/pagos', require('./routes/pagos'));

// Ruta raíz de API
app.get('/api', (req, res) => res.json({ ok: true, msg: 'API Tienda Zamis' }));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});