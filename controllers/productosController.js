const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.create = async (req, res) => {
  try {
    const { nombre, precio, descripcion, imagen } = req.body;
    const [result] = await db.query('INSERT INTO productos (nombre, precio, descripcion, imagen) VALUES (?,?,?,?)', [nombre, precio, descripcion, imagen]);
    res.status(201).json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.update = async (req, res) => {
  try {
    const { nombre, precio, descripcion, imagen } = req.body;
    const [result] = await db.query('UPDATE productos SET nombre=?, precio=?, descripcion=?, imagen=? WHERE id=?', [nombre, precio, descripcion, imagen, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Actualizado' });
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};
