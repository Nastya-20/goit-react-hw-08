import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from '../../redux/filters/slice';
import { deleteContact } from '../../redux/contacts/operations';
import Contact from '../Contact/Contact';
import { toast } from 'react-toastify';
import ConfirmModal from '../ConfirmModal/ConfirmModal'; 
import css from './ContactsList.module.css';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleDeleteClick = (contactId) => {
    setSelectedContactId(contactId);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedContactId) {
      dispatch(deleteContact(selectedContactId))
        .then(() => {
          toast.success('Contact deleted successfully!');
          setModalOpen(false);
          setSelectedContactId(null);
        })
        .catch(() => {
          toast.error('Failed to delete contact.');
          setModalOpen(false);
          setSelectedContactId(null);
        });
    }
  };

  return (
    <div>
      <ul className={css.list}>
        {filteredContacts.length === 0 ? (
          <li className={css.textItem}>No contacts to display</li>
        ) : (
          filteredContacts.map(({ id, name, number }) => (
            <li key={id} className={css.item}>
              <Contact 
                id={id} 
                name={name} 
                number={number} 
                onDelete={handleDeleteClick} 
              />
            </li>
          ))
        )}
      </ul>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this contact?"
      />
    </div>
  );
};

