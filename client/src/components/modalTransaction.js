import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import css from './modal.module.css';

Modal.setAppElement('#root');

export default function ModalTransaction({ onClose, modalType, transaction }) {
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

  return (
    <Modal isOpen={true} className={css.Modal} overlayClassName={css.Overlay}>
      <div className="row">
        <div className="col s10">
          <h4>Título</h4>
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
            disabled="disabled"
          />
          <span class="red-text text-darken-2">Despesas</span>
        </label>
        <label class="col s6">
          <input
            class="with-gap"
            name="group1"
            type="radio"
            disabled="disabled"
          />
          <span class="green-text text-darken-2">Receita</span>
        </label>
      </div>

      <div className="row">
        <div class="input-field col s12">
          <input placeholder="Descrição" id="description" type="text" />
          <label for="description" className="active">
            Descrição
          </label>
        </div>
      </div>
      <div className="row">
        <div class="input-field col s12">
          <input placeholder="Categoria" id="category" type="text" />
          <label for="category" className="active">
            Categoria
          </label>
        </div>
      </div>
      <div className="row">
        <div class="input-field col s6">
          <input placeholder="Valor" id="value" type="number" />
          <label for="value" className="active">
            Valor
          </label>
        </div>
        <div class="input-field col s6">
          <input id="date" type="date" />
        </div>
      </div>

      <a class="waves-effect waves-light btn">
        <i class="material-icons right">save</i>SALVAR
      </a>
    </Modal>
  );
}
