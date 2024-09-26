import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactsList  from '../../components/ContactsList/ContactsList';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectLoading, selectError } from '../../redux/contacts/selectors';
import Loader from '../../components/Loader/Loader';

export default function ContacsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
   const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      {isLoading && <Loader />} 
      {error && <div>Error fetching contacts: {error}</div>} 
      <ContactForm/>
      <ContactsList />
    </>
  );
}