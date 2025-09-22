const { Router } = require('express');
const { register, login, renderRegisterPage, renderLoginPage, logout } = require('../controllers/userController');

const router = Router();

router.post('/register', register);
router.get('/register', renderRegisterPage); 

router.post('/login', login);
router.get('/login', renderLoginPage);

router.get('/logout', logout); // Adicione esta rota

module.exports = router;