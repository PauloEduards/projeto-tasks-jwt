const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  // ... (esta parte não muda)
  const payload = {
    id: user.id,
    username: user.username,
    name: user.name
  };
  return jwt.sign(
    payload,
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

const authMiddleware = (req, res, next) => {
  // ---> ADICIONE ESSAS LINHAS PARA DEBUGAR
  console.log('==============================');
  console.log('Cookies recebidos na requisição:', req.cookies);
  // ---> FIM DAS LINHAS DE DEBUG

  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect('/api/user/login');
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect('/api/user/login');
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  generateToken,
  authMiddleware
}