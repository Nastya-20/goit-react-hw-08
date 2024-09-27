import React from 'react';
import css from './ConfirmModal.module.css';

 export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <h2>Confirmation</h2>
        <p className={css.message}>{message}</p>
        <div className={css.buttons}>
          <button onClick={onConfirm} className={css.confirm}>
            Confirm
          </button>
          <button onClick={onClose} className={css.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


