const { Client } = require('pg');

// dados de conexão do banco

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'stocksystem',
});

client.connect();
console.log('🔥 Banco Conectado!');

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};

// Query('SELECT * FROM contacts').then((result) => console.log(result));
// seleciona todos os dados da tabela contatos
