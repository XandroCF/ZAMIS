// routes.js
const express = require("express");
const router = express.Router();
const conexion = require("./db");

// 📌 Ruta: obtener todos los usuarios
router.get("/usuarios", (req, res) => {
  conexion.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al consultar usuarios" });
    }
    res.json(results);
  });
});

// 📌 Ruta: agregar un usuario
router.post("/usuarios", (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  conexion.query(
    "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)",
    [nombre, correo, contraseña],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al insertar usuario" });
      }
      res.json({ mensaje: "✅ Usuario agregado", id: result.insertId });
    }
  );
});

// 📌 Ruta: obtener productos
router.get("/productos", (req, res) => {
  conexion.query("SELECT * FROM productos", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al consultar productos" });
    }
    res.json(results);
  });
});

module.exports = router;