import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import css from './modal.module.css';

Modal.setAppElement('#root');

export default function ModalTransaction({
  onClose,
  onSave,
  modalType,
  transaction,
}) {
  const [description, setDescription] = useState(transaction.description);
  const [value, setValue] = useState(transaction.value);
  const [category, setCategory] = useState(transaction.category);
  const [yearMonthDay, setYearMonthDay] = useState(transaction.yearMonthDay);
  const [type, setType] = useState(transaction.type);

  //Evento para monitorar a tecla Esc, através de keydown
  //----------------------------------------------------------------------------
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Eliminando evento
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleSaveTransaction = () => {
    onSave({
      _id: transaction._id,
      description,
      value,
      category,
      yearMonthDay,
      type,
    });
  };

  return (
    <Modal isOpen={true} className={css.Modal} overlayClassName={css.Overlay}>
      <div className="row">
        <div className="col s10">
          <h4>{modalType === 'NEW' ? 'Nova entrada' : 'Editar'}</h4>
        </div>
        <div className="col s2">
          <a
            class="waves-effect waves-light btn red"
            onClick={() => {
              onClose(null);
            }}
          >
            <i class="material-icons">close</i>
          </a>
        </div>
      </div>
      <div className="row">
        <label class="col s6">
          <input
            class="with-gap red"
            name="group1"
            type="radio"
            disabled={modalType === 'EDIT'}
            checked={type === '-'}
            onChange={() => {
              setType('-');
            }}
          />
          <span class="red-text text-darken-2">Despesas</span>
        </label>
        <label class="col s6">
          <input
            class="with-gap"
            name="group1"
            type="radio"
            disabled={modalType === 'EDIT'}
            checked={type === '+'}
            onChange={() => {
              setType('+');
            }}
          />
          <span class="green-text text-darken-2">Receita</span>
        </label>
      </div>

      <div className="row">
        <div class="input-field col s12">
          <input
            placeholder="Descrição"
            id="description"
            type="text"
            value={description}
            onChange={(evt) => {
              setDescription(evt.target.value);
            }}
          />
          <label for="description" className="active">
            Descrição
          </label>
        </div>
      </div>
      <div className="row">
        <div class="input-field col s12">
          <input
            placeholder="Categoria"
            id="category"
            type="text"
            value={category}
            onChange={(evt) => {
              setCategory(evt.target.value);
            }}
          />
          <label for="category" className="active">
            Categoria
          </label>
        </div>
      </div>
      <div className="row">
        <div class="input-field col s6">
          <input
            placeholder="Valor"
            id="value"
            type="number"
            value={value}
            onChange={(evt) => {
              setValue(evt.target.value * 1);
            }}
          />
          <label for="value" className="active">
            Valor
          </label>
        </div>
        <div class="input-field col s6">
          <input
            id="date"
            type="date"
            value={yearMonthDay}
            onChange={(evt) => {
              setYearMonthDay(evt.target.value);
            }}
          />
        </div>
      </div>

      <a class="waves-effect waves-light btn" onClick={handleSaveTransaction}>
        <i class="material-icons right">save</i>SALVAR
      </a>
    </Modal>
  );
}
