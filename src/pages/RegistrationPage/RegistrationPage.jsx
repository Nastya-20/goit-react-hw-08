import { Helmet } from 'react-helmet-async';
import  RegistrationForm  from '../../components/RegistrationForm/RegistrationForm';

export default function RegistrationPage() {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <RegistrationForm />
    </div>
  );
}