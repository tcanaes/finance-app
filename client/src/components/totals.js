import React from 'react';

export default function Totals({ totals }) {
  return (
    <div className="row">
      <div className="col s3">
        <span>Lançcamentos:</span>
        <span>{totals.lancamentos}</span>
      </div>
      <div className="col s3">
        <span>Receitas:</span>
        <span>{totals.receitas}</span>
      </div>
      <div className="col s3">
        <span>Despesas:</span>
        <span>{totals.despesas}</span>
      </div>
      <div className="col s3">
        <span>Saldo:</span>
        <span>{totals.receitas - totals.despesas}</span>
      </div>
    </div>
  );
}
