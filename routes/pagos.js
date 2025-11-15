const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pagosController');
const auth = require('../middlewares/auth');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', auth, ctrl.create); // solo usuarios autenticados
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
