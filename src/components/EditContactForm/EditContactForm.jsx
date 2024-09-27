import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateContact } from '../../redux/contacts/operations';
import css from './EditContactForm.module.css';

const EditContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short, min 3 letters!')
    .max(50, 'Too long, max 50 letters!')
    .required('This field is required!'),
  number: Yup.string()
    .required('This field is required!'),
});

export default function EditContactForm({ contact }) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(updateContact({ id: contact.id, ...values }));
  };

  return (
    <Formik
      initialValues={{
        name: contact.name,
        number: contact.number,
      }}
      validationSchema={EditContactSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
          <div className={css.formGroup}>
            <label className={css.label}>
              Name
              <Field className={css.name} type="text" name="name" />
              <ErrorMessage name="name" component="span" className={css.error} />
            </label>
          </div>
          <div className={css.formGroup}>
            <label className={css.label}>
              Number
              <Field className={css.number} type="text" name="number" />
              <ErrorMessage name="number" component="span" className={css.error} />
            </label>
          </div>
          <button className={css.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
