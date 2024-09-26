import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from '../../redux/filters/selectors';
import { changeFilter } from '../../redux/filters/slice';
import { deleteContact } from '../../redux/contacts/operations';
import Contact from '../Contact/Contact';
import { toast } from 'react-toastify';
import css from './ContactsList.module.css';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectContacts);

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId))
      .then(() => {
        toast.success('Contact deleted successfully!');
      })
      .catch(() => {
        toast.error('Failed to delete contact.');
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter contacts"
        onChange={handleFilterChange}
        className={css.filterInput}
      />
      <ul className={css.list}>
        {filteredContacts.length === 0 ? (
          <li className={css.textItem}>No contacts to display</li>
        ) : (
          filteredContacts.map(({ id, name, number }) => (
            <li key={id} className={css.item}>
              <Contact id={id} name={name} number={number} onDelete={handleDelete} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

