import express from 'express';
import * as transactionController from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter
  .route('/')
  .get(transactionController.getAllTransactions)
  .patch(transactionController.updateTransaction)
  .post(transactionController.createTransaction);

transactionRouter
  .route('/:id')
  .get(transactionController.getTransaction)
  .delete(transactionController.deleteTransaction);

export default transactionRouter;
