import React from 'react';
import css from './Error.module.css';

export default function Error({ children }) {
  return (
    <div className={css.titleError}>
      <p>{children}</p>
    </div>
  );
}