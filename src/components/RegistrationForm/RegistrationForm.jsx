import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './RegistrationForm.module.css';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import axios from 'axios';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short, min 3 letters!')
    .max(50, 'Too long, max 50 letters!')
    .required('This field is required!'),
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required!'),
  password: Yup.string()
    .min(7, 'Password is too short - should be 7 chars minimum.')
    .required('This field is required!'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const [emailExists, setEmailExists] = useState(false);

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post('/api/check-email', { email });
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
    await dispatch(register(values)).unwrap();
    toast.success('Registration successful!');
    resetForm();
  } catch (error) {
    // Перевіряємо, якщо є помилка пов'язана з повторним email
    if (error.response && error.response.status === 409) {
      setEmailExists(true);
      toast.error('Email already registered!');
    } else {
      toast.error(`Registration failed: ${error.message}`);
    }
  }finally {
      setSubmitting(false);
    }
};


  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={css.form} autoComplete="off">
          <div className={css.formGroup}>
            <label className={css.label}>
              Username
              <Field className={css.name} type="text" name="name" />
              <ErrorMessage name="name" component="span" className={css.error} />
            </label>
          </div>
          <div className={css.formGroup}>
            <label className={css.label}>
              Email
              <Field
                className={css.email}
                type="email"
                name="email"
                onChange={(e) => {
                  const { value } = e.target;
                  setFieldValue('email', value);
                  checkEmailExists(value);
                }}
              />
              <ErrorMessage name="email" component="span" className={css.error} />
              {emailExists && <span className={css.error}>Email already registered!</span>}
            </label>
          </div>
          <div className={css.formGroup}>
            <label className={css.label}>
              Password
              <Field className={css.password} type="password" name="password" />
              <ErrorMessage name="password" component="span" className={css.error} />
            </label>
          </div>
          <button className={css.register} type="submit" disabled={isSubmitting || emailExists}>
            {isSubmitting ?  <Loader /> : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
}


