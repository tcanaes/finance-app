import React from 'react';

export default function TransactionsFilter({
  filterTransactions,
  addNewTransaction,
}) {
  return (
    <div className="row">
      <div className="input-field col s3">
        <a class="btn" onClick={addNewTransaction}>
          <i class="material-icons left">add</i>NOVO LANÇAMENTO
        </a>
      </div>
      <div className="input-field col s9">
        <input
          id="filtro"
          type="text"
          className="validate"
          placeholder="Filtro"
        />
      </div>
    </div>
  );
}
