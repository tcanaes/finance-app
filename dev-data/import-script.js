import * as fs from 'fs';
import dbConnection from '../src/setup/db.js';
import Transaction from '../src/models/transactionModel.js';

dbConnection.then(() => {
  console.log('DB connection established');
  start();
});

const start = async () => {
  //importa dados do arquivo
  const fileData = fs.readFileSync(
    './dev-data/transactionsArray.json',
    'utf-8'
  );

  //Converte arquivo pra JSON
  const transactions = JSON.parse(fileData);

  //Apaga todos os dados do BD
  await Transaction.deleteMany();
  console.log('Dados existentes excluídos...');

  //Insere os dados do arquivo no BD.
  await Transaction.create(transactions);
  console.log('Banco de dados foi regerado.');

  process.exit(0);
};
