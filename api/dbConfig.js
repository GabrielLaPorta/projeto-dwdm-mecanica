const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres:postgres@localhost:5432/mecanica'
});

pool.on('connect', () => {
  console.log('Base de dados conectado com sucesso!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};