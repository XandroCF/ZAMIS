const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    if (!nombre || !correo || !contraseña) return res.status(400).json({ message: 'Faltan datos' });

    // Verificar existencia
    const [exists] = await db.query('SELECT id FROM usuarios WHERE correo = ?', [correo]);
    if (exists.length) return res.status(400).json({ message: 'Correo ya registrado' });

    const hash = await bcrypt.hash(contraseña, saltRounds);
    const [result] = await db.query('INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?,?,?)', [nombre, correo, hash]);
    res.status(201).json({ id: result.insertId, nombre, correo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) return res.status(400).json({ message: 'Faltan datos' });

    const [rows] = await db.query('SELECT id, contraseña, nombre FROM usuarios WHERE correo = ?', [correo]);
    if (!rows.length) return res.status(400).json({ message: 'Credenciales inválidas' });

    const user = rows[0];
    const valid = await bcrypt.compare(contraseña, user.contraseña);
    if (!valid) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, correo }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, id: user.id, nombre: user.nombre });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, correo, creado_en FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error servidor' });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query('SELECT id, nombre, correo, creado_en FROM usuarios WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error servidor' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, correo } = req.body;
    const [result] = await db.query('UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?', [nombre, correo, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error servidor' });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error servidor' });
  }
};
