const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require('../middlewares/authMiddleware');

const renderRegisterPage = (req, res) => {
  const { error } = req.query;
  res.render('register', { error });
};

// CORRIGIDO: Agora esta função passa a variável de erro para a página de login
const renderLoginPage = (req, res) => {
  const { error } = req.query;
  res.render('login', { error });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    // CORRIGIDO: Redireciona com mensagem de erro clara
    if (!user) {
      return res.redirect('/login?error=Usuário não encontrado.');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    // CORRIGIDO: Redireciona com mensagem de erro clara
    if (!passwordIsValid) {
      return res.redirect('/login?error=Senha incorreta.');
    }

    const token = generateToken(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      path: '/',
    });
    return res.redirect('/tasks');
  } catch (error) {
    console.error('ERRO NO LOGIN:', error);
    res.redirect('/login?error=Ocorreu um erro inesperado.');
  }
};

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.redirect('/api/user/register?error=Este e-mail já está em uso.');
    }
    const newPassword = bcrypt.hashSync(password, 10);
    await User.create({ name, username, password: newPassword });
    res.redirect('/login');
  } catch (error) {
    console.log("ERRO AO REGISTRAR:", error);
    res.redirect('/api/user/register?error=Ocorreu um erro ao tentar registrar.');
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/login');
};

module.exports = {
  renderRegisterPage,
  renderLoginPage,
  login,
  register,
  logout,
};