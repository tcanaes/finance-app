import React, { useEffect, useState } from 'react';
//import Select from 'react-select';

export default function PeriodSelector({
  periodsList,
  setPeriod,
  currentPeriod,
}) {
  const newPeriodSelected = async (res) => {
    setPeriod(res.target.value);
  };

  const previousPreriod = async () => {
    const previousIndex = periodsList.indexOf(currentPeriod) - 1;
    if (previousIndex >= 0) setPeriod(periodsList[previousIndex]);
  };
  const nextPreriod = async () => {
    const nextIndex = periodsList.indexOf(currentPeriod) + 1;
    if (nextIndex < periodsList.length) setPeriod(periodsList[nextIndex]);
  };

  return (
    <div className="row">
      <div className="input-field col s1">
        <a className=" btn-small" onClick={previousPreriod}>
          <i className="material-icons">chevron_left</i>
        </a>
      </div>
      <div className="input-field col s3">
        <select className="browser-default" onChange={newPeriodSelected}>
          {periodsList.map((option) => {
            if (option === currentPeriod)
              return (
                <option selected={true} key={option} value={option}>
                  {option}
                </option>
              );
            else
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
          })}
        </select>
      </div>

      <div className="input-field col s1">
        <a className="btn-small" onClick={nextPreriod}>
          <i className="material-icons">chevron_right</i>
        </a>
      </div>
    </div>
  );
}
