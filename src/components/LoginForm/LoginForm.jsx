import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/auth/operations';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../Loader/Loader';
import css from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('This field is required!'),
  password: Yup.string()
    .min(7, 'Password is too short - should be 7 chars minimum.')
    .required('This field is required!'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await dispatch(logIn(values)).unwrap(); 
      console.success('Login successful!');
      resetForm();
      navigate('/contacts');
    } catch (error) {
      console.error(`Login failed: Please try again`); 
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
          <div className={css.formGroup}>
            <label className={css.label}>
              Email
              <Field className={css.email} type="email" name="email" />
              <ErrorMessage name="email" component="span" className={css.error} />
            </label>
          </div>
          <div className={css.formGroup}>
            <label className={css.label}>
              Password
              <Field className={css.password} type="password" name="password" />
              <ErrorMessage name="password" component="span" className={css.error} />
            </label>
          </div>
          <button className={css.login} type="submit" disabled={isSubmitting}>
            {isSubmitting ?  <Loader /> : 'Log In'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

