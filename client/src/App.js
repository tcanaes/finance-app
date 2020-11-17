import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PeriodSelector from './components/periodSelector.js';
import Totals from './components/totals.js';
import TransactionsFilter from './components/transactionsFilter.js';
import TransactionsList from './components/transactionsList.js';
import ModalTransaction from './components/modalTransaction.js';

export default function App() {
  const [currentPeriod, setCurrentPeriod] = useState('');
  const [periods, setPeriods] = useState([]);
  const [totals, setTotals] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [transactionEdit, setTransactionEdit] = useState({});
  const [listedTransactions, setListedTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalType, setModalType] = useState('');

  const getCurrentPeriod = async () => {
    const currDate = new Date();
    let currMonth = currDate.getMonth() + 1 + '';
    const currYear = currDate.getFullYear() + '';
    if (currMonth.length < 2) currMonth = '0' + currMonth;
    const currPeriod = `${currYear}-${currMonth}`;
    setCurrentPeriod(currPeriod);
  };

  const getSavedPeriods = async () => {
    // console.log('getting saved periods from:');
    // console.log(`${window.location.host}/api/v1/finance/saved-periods`);
    axios
      //.get(`${window.location.host}/api/v1/finance/saved-periods`)
      .get(`api/v1/finance/saved-periods`)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.data.length > 0) setPeriods(response.data.data);
      })
      .catch((err) => {
        console.log('Erro no axios!');
        console.log(err);
      });
  };

  //Set initial data
  useEffect(() => {
    getSavedPeriods();
    getCurrentPeriod();
  }, []);

  useEffect(() => {
    if (!currentPeriod) return;
    axios
      .get(`api/v1/finance?period=${currentPeriod}`)
      .then((response) => {
        setTransactions(response.data.data);
        setTotals(response.data.totals);
      })
      .catch((err) => {});
  }, [currentPeriod]);

  useEffect(() => {
    if (!periods) return;
  }, [periods]);

  useEffect(() => {
    filterTransactions();
  }, [transactions]);

  const setNewPeriod = async (period) => {
    setCurrentPeriod(period);
  };

  const filterTransactions = async (filterString = null) => {
    if (filterString === null) setListedTransactions(transactions);
    else setListedTransactions(transactions.includes(filterString));
  };

  const addNewTransaction = async () => {
    setIsModalOpen(true);
    setModalType('NEW');
  };

  const closeModalTransaction = async () => {
    setIsModalOpen(false);
    setModalType('');
  };

  return (
    <div className="container">
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <h2>Controle Financeiro Pessoal</h2>
      <PeriodSelector
        periodsList={periods}
        setPeriod={setNewPeriod}
        currentPeriod={currentPeriod}
      />
      <Totals totals={totals} />
      <TransactionsFilter
        filterTransactions={filterTransactions}
        addNewTransaction={addNewTransaction}
      />
      <TransactionsList transactions={listedTransactions} />
      {isModalOpen && (
        <ModalTransaction
          onClose={closeModalTransaction}
          modalType={modalType}
          transaction={transactionEdit}
        />
      )}
    </div>
  );
}
