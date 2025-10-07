const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

const contactosRouter = require('./routes/contactos');
const productosRouter = require('./routes/productos');
const usuariosRouter = require('./routes/usuarios');
const pagosRouter = require('./routes/pagos');

app.use('/contactos', contactosRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/pagos', pagosRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
