import mongoose from 'mongoose';

// Monta o endereço de acesso ao banco de dados
const { MONGODB } = process.env;

// Conecta ao banco de dados
const dbConnection = mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  authSource: 'admin',
});

export default dbConnection;
