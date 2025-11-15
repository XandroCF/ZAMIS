const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contactos ORDER BY fecha DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.create = async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    if (!nombre || !email || !mensaje) return res.status(400).json({ message: 'Faltan datos' });
    const [result] = await db.query('INSERT INTO contactos (nombre,email,mensaje) VALUES (?,?,?)', [nombre, email, mensaje]);
    res.status(201).json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM contactos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};
