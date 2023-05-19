import { useState, memo } from 'react';
import './index.sass';
import iconClose from './img/ic-close-input.svg';

export const Search = memo(({ setSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    setSearch(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    setSearch('');
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
