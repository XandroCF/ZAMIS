const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuariosController');
// Public
router.post('/register', ctrl.register);   // crear usuario
router.post('/login', ctrl.login);         // login -> devuelve JWT
// Protected
const auth = require('../middlewares/auth');
router.get('/', auth, ctrl.getAll);
router.get('/:id', auth, ctrl.getById);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
