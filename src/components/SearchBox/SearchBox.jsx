import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNameFilter, changeFilter } from '../../redux/filtersSlice';  
import css from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.wrapper}>
      <p className={css.search}>Find contacts by name</p>
      <input
        className={css.find}
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Enter name..."
      />
    </div>
  );
}