import './index.css';
import iconClose from './img/ic-close-input.svg';

export const Search = ({ setSearch }) => {
  return (
    <div className="search__container">
      <input
        type="text"
        placeholder="Поиск"
        onChange={(e) => setSearch(e.target.value)}
        className="search__input"
      />
      {/* Надо ещё добавить удаление текста из строки поиска */}
      <img
        src={iconClose}
        className="search__icon_close"
        onClick={() => setSearch('')}
      />
    </div>
  );
};
