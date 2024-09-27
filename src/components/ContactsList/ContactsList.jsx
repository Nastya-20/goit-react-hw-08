import React from 'react';
import { useSelector} from 'react-redux';
import { selectFilteredContacts } from '../../redux/filters/slice';
import Contact from '../Contact/Contact';
import css from './ContactsList.module.css';

export const ContactsList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

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
              />
            </li>
          ))
        )}
      </ul>
   </div>
  );
};

