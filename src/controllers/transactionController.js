import Transaction from '../models/transactionModel.js';

const getAllTransactions = async (req, res, next) => {
  if (!req.query.period) {
    res.status(400).json({
      status: 'fail',
      message:
        'Informar o parâmetro "?period", cujo formato é yyyy-mm. Caso queira trazer TODAS as transações, informe "?period=ALL"',
    });
    return;
  }

  let query = {};
  if (req.query.period !== 'ALL') query.yearMonth = req.query.period;

  let transactions;
  let totals;
  try {
    transactions = await Transaction.find(query).sort({
      year: 1,
      month: 1,
      day: 1,
    });
    totals = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          lancamentos: { $sum: 1 },
          receitas: {
            $sum: {
              $cond: [{ $eq: ['$type', '+'] }, '$value', 0],
            },
          },
          despesas: {
            $sum: {
              $cond: [{ $eq: ['$type', '-'] }, '$value', 0],
            },
          },
        },
      },
    ]);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: transactions,
    totals: totals[0],
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

const savedPeriods = async (req, res, next) => {
  //Get All transactions periods
  const allTransactions = await Transaction.find({})
    .select('yearMonth')
    .distinct('yearMonth');

  if (allTransactions) {
    res
      .status(200)
      .json({ results: allTransactions.length, data: allTransactions });
    return;
  }

  next();
};

export {
  getAllTransactions,
  getTransaction,
  deleteTransaction,
  createTransaction,
  updateTransaction,
  savedPeriods,
};
