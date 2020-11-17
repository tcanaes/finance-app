import React from 'react';

export default function TransactionsList({ transactions }) {
  return (
    <div>
      {transactions.map((transaction) => {
        let classes = '';
        if (transaction.type === '+') classes = 'row card-panel teal lighten-2';
        else if (transaction.type === '-')
          classes = 'row card-panel red lighten-3';
        return (
          <div className={classes} key={transaction._id}>
            <div className="col s1">
              <span className="card-title">{transaction.day}</span>
            </div>
            <div className="col s7">
              <span className="card-title">{transaction.category}</span>
              <p>{transaction.description}</p>
            </div>
            <div className="col s2">{transaction.value}</div>
            <div className="col s1">
              <i class="material-icons">edit</i>
            </div>
            <div className="col s1">
              <i class="material-icons">delete</i>
            </div>
          </div>
        );
      })}
    </div>
  );
}
