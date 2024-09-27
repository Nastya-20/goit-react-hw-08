import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Contact manager welcome page{' '}
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
        </span>
        <p className={css.text}>You can create and delete your contacts.
          The contact book saves you time.
          Here you can easily and quickly find the contact you need or add a new one.
          Your contacts will be safely stored in your application!</p>
      </h1>
    </div>
  );
}

