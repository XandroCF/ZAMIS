const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pagos ORDER BY id DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pagos WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.create = async (req, res) => {
  try {
    const { usuario_id, total, metodo_pago } = req.body;
    if (!total || !metodo_pago) return res.status(400).json({ message: 'Faltan datos' });

    // validar usuario si se pasa
    if (usuario_id) {
      const [u] = await db.query('SELECT id FROM usuarios WHERE id = ?', [usuario_id]);
      if (!u.length) return res.status(400).json({ message: 'Usuario no existe' });
    }

    const [result] = await db.query('INSERT INTO pagos (usuario_id, total, metodo_pago) VALUES (?,?,?)', [usuario_id || null, total, metodo_pago]);
    res.status(201).json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.update = async (req, res) => {
  try {
    const fields = [];
    const params = [];
    const { usuario_id, total, metodo_pago } = req.body;
    if (usuario_id !== undefined) { fields.push('usuario_id=?'); params.push(usuario_id); }
    if (total !== undefined) { fields.push('total=?'); params.push(total); }
    if (metodo_pago !== undefined) { fields.push('metodo_pago=?'); params.push(metodo_pago); }
    if (!fields.length) return res.status(400).json({ message: 'Nada para actualizar' });
    params.push(req.params.id);
    const [result] = await db.query(`UPDATE pagos SET ${fields.join(', ')} WHERE id = ?`, params);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Actualizado' });
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM pagos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) { res.status(500).json({ error: 'Error servidor' }); }
};
