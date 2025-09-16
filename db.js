const sequelize = require('sequelize');
const db = new sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

async function testConnection() {
  try {
    await db.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

testConnection();

module.exports = db;