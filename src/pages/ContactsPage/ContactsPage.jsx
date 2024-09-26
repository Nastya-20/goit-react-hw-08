import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import {ContactForm} from '../../components/ContactForm/ContactForm';
import {ContactsList}  from '../../components/ContactsList/ContactsList';
import { fetchContacts } from '../../redux/contacts/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import css from './ContactsPage.module.css';

export default function ContacsPage() {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
   <div className={css.container}>
     <div className={css.wrapper}>
      <Helmet>
        <title>Your contacts</title>
        </Helmet>
        <h1>Your contacts</h1>
      <ContactForm />
      <SearchBox />
      </div>
      <ContactsList />
    </div>
  );
}