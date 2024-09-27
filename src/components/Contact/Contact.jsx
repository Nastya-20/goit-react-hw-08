import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import ConfirmModal from '../ConfirmModal/ConfirmModal'; // Импорт модального окна
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import css from './Contact.module.css';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false); // Контроль модального окна

  // Функция для открытия модального окна
  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  // Функция подтверждения удаления
  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteContact(id)).unwrap(); // Удаление контакта по его ID
      toast.success('Contact deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete contact.');
    } finally {
      setModalOpen(false); // Закрытие модального окна
    }
  };

  // Функция отмены удаления (закрытие модального окна)
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.infoGroup}>
          <FontAwesomeIcon className={css.icon} icon={faUser} />
          <p className={css.name}>{name}</p>
        </div>
        <div className={css.infoGroup}>
          <FontAwesomeIcon className={css.icon} icon={faPhone} />
          <p className={css.number}>{number}</p>
        </div>
      </div>

      {/* Кнопка для вызова модального окна удаления */}
      <button type="button" className={css.btn} onClick={handleDeleteClick}>
        Delete
      </button>

      {/* Модальное окно подтверждения удаления */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete contact "${name}"?`}
      />
    </div>
  );
}
