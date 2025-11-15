const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactosController');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create);   // crear contacto (no auth)
router.delete('/:id', ctrl.remove); // opcional: admin
module.exports = router;