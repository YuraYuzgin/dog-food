import React from 'react';
import { useState } from 'react';
import { AllCardsList } from '../../components/AllCardsList/AllCardsList';
import { NoProductsByQuery } from '../../components/NoProductsByQuery/NoProductsByQuery';
import './index.sass';
import iconSortUp from './img/sort-up-solid.svg';
import iconSortDown from './img/sort-down-solid.svg';
import { changeWordByQuantity } from '../../utils/changeWordByQuantity';

export const CatalogPage = ({
  user,
  allProducts,
  changeLike,
  search,
  doSorting,
  setSearch,
}) => {
  const [currentSort, setCurrentSort] = useState(0);

  // Изменение сортировки на маленьких экранах
  const sortChange = (upOrDown) => {
    if (upOrDown === 'up') {
      if (currentSort === 5) setCurrentSort(0);
      if (currentSort < 5) setCurrentSort(currentSort + 1);
    }
    if (upOrDown === 'down') {
      if (currentSort === 0) setCurrentSort(5);
      if (currentSort > 0) setCurrentSort(currentSort - 1);
    }
  };

  // Массив категорий сортировки
  const sortArray = [
    { id: 'popular', title: 'Популярные' },
    { id: 'novelties', title: 'Новинки' },
    { id: 'cheapFirst', title: 'Сначала дешёвые' },
    { id: 'expensiveFirst', title: 'Сначала дорогие' },
    { id: 'byRating', title: 'По рейтингу' },
    { id: 'byDiscount', title: 'По скидке' },
  ];

  return (
    <div className="catalog__page">
      {/* Информация о количесиве найденных товаров */}
      {!!search && (
        <p className="info_by_search">
          По запросу <b>{search}</b>{' '}
          {allProducts.length === 1 ? 'найден ' : 'найдено '}
          {allProducts.length}
          {changeWordByQuantity(allProducts.length)}
        </p>
      )}

      {/* Уведомледние об отсутсвии продуктов по запросу */}
      {allProducts.length === 0 && search && (
        <NoProductsByQuery setSearch={setSearch} />
      )}

      {/* Сортировка на экранах от 680px */}
      {allProducts.length > 0 && (
        <div className="sort__cards__wrapper sort__cards__large">
          {sortArray.map((e) => (
            <span
              className="sort_item"
              key={e.id}
              onClick={() => doSorting(e.id)}
            >
              {e.title}
            </span>
          ))}
        </div>
      )}

      {/* Сортировка на экранах до 680px */}
      {allProducts.length > 0 && (
        <div className="sort__cards__wrapper sort__cards__small">
          <img
            className="sort_up"
            onClick={() => sortChange('up')}
            src={iconSortUp}
            alt="arrow up"
          />
          <img
            className="sort_down"
            onClick={() => sortChange('down')}
            src={iconSortDown}
            alt="arrow down"
          />
          <p
            className="current_sort"
            onClick={() => doSorting(sortArray[currentSort].id)}
          >
            {sortArray[currentSort].title}
          </p>
        </div>
      )}

      <AllCardsList
        userId={user._id}
        allProducts={allProducts}
        changeLike={changeLike}
      />
    </div>
  );
};
