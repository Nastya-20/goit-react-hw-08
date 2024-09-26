import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { toast } from 'react-toastify';
import css from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short, min 3 letters!')
    .max(50, 'Too long, max 50 letters!')
    .required('This field is required!'),
  number: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Must be a valid phone number with 10 digits')
    .required('This field is required!'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact))
      .then(() => {
        toast.success('Contact added successfully!');
        actions.resetForm();
      })
      .catch(() => {
        toast.error('Failed to add contact.');
      });
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label className={css.label} htmlFor="name">Name</label>
          <Field className={css.name} type="text" name="name" id="name" placeholder="Enter name..." />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label className={css.label} htmlFor="number">Number</label>
          <Field className={css.phone} type="text" name="number" id="number" placeholder="Enter number..." />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>
        <button className={css.add} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}