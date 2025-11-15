const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productosController');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

// Protected creation/modification (optional: require auth)
const auth = require('../middlewares/auth');
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
