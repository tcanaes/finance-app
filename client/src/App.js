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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  //Com base na data de hoje, exibe as transações do periodo atual
  const getCurrentPeriod = async () => {
    const currDate = new Date();
    let currMonth = currDate.getMonth() + 1 + '';
    const currYear = currDate.getFullYear() + '';
    if (currMonth.length < 2) currMonth = '0' + currMonth;
    const currPeriod = `${currYear}-${currMonth}`;
    if (currentPeriod !== currPeriod) setCurrentPeriod(currPeriod);
  };

  //Busca todos os períodos cadastrados na API para o usuário poder selecionar
  //na tela.
  const getSavedPeriods = async () => {
    axios
      //.get(`${window.location.host}/api/v1/finance/saved-periods`)
      .get(`api/v1/finance/saved-periods`)
      .then((response) => {
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

  //Toda vez que o período mudar, busca na API as transaçoes do novo periodo
  const selectTransactionsOnPeriod = () => {
    if (!currentPeriod) return;
    axios
      .get(`api/v1/finance?period=${currentPeriod}`)
      .then((response) => {
        if (response.data.results > 0) {
          setTransactions(response.data.data);
          setTotals(response.data.totals);
        } else {
          getCurrentPeriod();
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    selectTransactionsOnPeriod();
  }, [currentPeriod]);

  //O programa vai sempre exibir as transações filtradas, entao, quando nao
  //tem filtro, informa TODAS
  useEffect(() => {
    filterTransactions();
  }, [transactions]);

  //Atualiza o controle do periodo atual com o periodo em tela
  const setNewPeriod = async (period) => {
    setCurrentPeriod(period);
  };

  //Filta as transações que irão aparecer em tela
  const filterTransactions = async (filterString = null) => {
    if (filterString === null) setListedTransactions(transactions);
    else
      setListedTransactions(
        transactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(filterString)
        )
      );
  };

  //Abre o POPUP para inserção de uma nova transação
  const addNewTransaction = async () => {
    setIsModalOpen(true);
    setModalType('NEW');
  };

  //Abre o POPUP para edição de uma transação existente
  const editTransaction = async (id) => {
    const transaction = transactions.find(
      (transaction) => transaction._id === id
    );
    if (transaction) {
      setTransactionEdit(transaction);
      setIsModalOpen(true);
      setModalType('EDIT');
    }
  };

  //Fecha a tela do POPUP
  const closeModalTransaction = async () => {
    setIsModalOpen(false);
    setModalType('');
    setTransactionEdit({});
  };

  //Exclui a transação
  const deleteTransaction = async (id) => {
    axios
      .delete(`api/v1/finance/${id}`)
      .then((res) => {
        getSavedPeriods();
        selectTransactionsOnPeriod();
      })
      .catch((err) => {});
  };

  //Salva a transacao nova/editada
  const saveTransaction = async (transaction) => {
    setIsModalOpen(false);
    setModalType('');
    setTransactionEdit({});

    let result;
    //Se tem ID, então é uma transação sendo editada.
    try {
      if (transaction._id) {
        result = await axios.patch(`api/v1/finance`, transaction);
      } else {
        result = await axios.post(`api/v1/finance`, transaction);
      }
    } catch (err) {
      console.log('Erro axios: ', err);
    }
    getSavedPeriods();
    selectTransactionsOnPeriod();
  };

  //Retorna os objetos para serem renderizados em tela
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
      <TransactionsList
        transactions={listedTransactions}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
      {isModalOpen && (
        <ModalTransaction
          onClose={closeModalTransaction}
          onSave={saveTransaction}
          modalType={modalType}
          transaction={transactionEdit}
        />
      )}
    </div>
  );
}
