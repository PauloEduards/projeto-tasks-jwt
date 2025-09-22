const { Router } = require('express');
const { list, create, update, complete, deleteById } = require('../controllers/taskController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = Router();

router.get('/', authMiddleware, list);
router.post('/', authMiddleware, create);
router.post('/edit/:id', authMiddleware, update);
router.post('/complete/:id', authMiddleware, complete);
router.post('/delete/:id', authMiddleware, deleteById);

module.exports = router;