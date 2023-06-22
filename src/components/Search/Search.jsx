import { useState, memo } from 'react';
import './index.sass';
import iconClose from './img/ic-close-input.svg';
import { useDispatch } from 'react-redux';
import {
  fetchProductsByQuery,
  setSearch,
} from '../../storage/slices/productsSlice';

export const Search = memo(() => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
    dispatch(setSearch(e.target.value));
  };

  const handleClear = () => {
    setValue('');
    dispatch(setSearch(''));
  };

  return (
    <div className="search__container">
      <input
        type="text"
        placeholder="Поиск"
        value={value}
        onChange={handleChange}
        className="search__input"
      />
      <img
        src={iconClose}
        alt="close"
        className="search__icon_close"
        onClick={handleClear}
      />
    </div>
  );
});
