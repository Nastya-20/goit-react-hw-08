import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, changeFilter } from '../../redux/filters/slice';  
import css from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.wrapper}>
      <p className={css.search}>Find contacts by name or number</p>
      <input
        className={css.find}
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Enter name or number..."
      />
    </div>
  );
}