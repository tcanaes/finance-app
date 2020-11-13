import Transaction from '../models/transactionModel.js';

const getAllTransactions = async (req, res, next) => {
  console.log('Get All!');
  let transactions;
  try {
    transactions = await Transaction.find();
  } catch (err) {}
  res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: transactions,
  });
};

const getTransaction = async (req, res, next) => {
  const id = req.params.id;
  try {
    const transaction = await Transaction.findById(id);
    res.status(200).json({
      status: 'success',
      data: transaction,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Transaction not found...',
    });
  }
};

const deleteTransaction = async (req, res, next) => {
  const id = req.params.id;
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      message: 'Transaction deleted!',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Transaction not found...',
    });
  }
};

const createTransaction = async (req, res, next) => {
  const { description, value, category, year, month, day, type } = req.body;
  const newTransactionData = {
    description,
    value,
    category,
    year,
    month,
    day,
    type,
  };
  try {
    const newTransaction = await Transaction.create(newTransactionData);
    res.status(200).json({
      status: 'success',
      data: newTransaction,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error adding new transaction...',
    });
  }
};

const updateTransaction = async (req, res, next) => {
  const {
    _id,
    description,
    value,
    category,
    year,
    month,
    day,
    type,
  } = req.body;

  const updTransactionData = {
    description,
    value,
    category,
    year,
    month,
    day,
    type,
  };
  try {
    await Transaction.findByIdAndUpdate(_id, updTransactionData);
    res.status(200).json({
      status: 'success',
      message: 'Transação atualizada com sucesso.',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error updating transaction...',
    });
  }
};

export {
  getAllTransactions,
  getTransaction,
  deleteTransaction,
  createTransaction,
  updateTransaction,
};
