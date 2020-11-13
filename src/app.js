import path from 'path';
import express from 'express';
import cors from 'cors';
import transactionRouter from './routers/transactionRouter.js';

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());

//Vinculando o React ao APP
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/build')));

//Vinculando as rotas da API
app.use('/api/v1/finance/', transactionRouter);

//Tratando rotas erradas
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Rota inválida. Acesse /api/v1/finance/',
  });
});

export default app;
