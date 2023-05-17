import React, { useContext } from 'react';
import { useState } from 'react';
import { AllCardsList } from '../../components/AllCardsList/AllCardsList';
import { NoProductsByQuery } from '../../components/NoProductsByQuery/NoProductsByQuery';
import './index.sass';
import iconSortUp from './img/sort-up-solid.svg';
import iconSortDown from './img/sort-down-solid.svg';
import { changeWordByQuantity } from '../../utils/changeWordByQuantity';
import { ProductCardContext } from '../../context/productCardContext';

export const CatalogPage = ({ allProducts }) => {
  const [currentSort, setCurrentSort] = useState(0);
  const [isActive, setIsActive] = useState(-1);

  const { doSorting, search, setSearch } = useContext(ProductCardContext);

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
    { id: 'popular', title: 'Популярные', isActive: false },
    { id: 'novelties', title: 'Новинки', isActive: false },
    { id: 'cheapFirst', title: 'Сначала дешёвые', isActive: false },
    { id: 'expensiveFirst', title: 'Сначала дорогие', isActive: false },
    { id: 'byRating', title: 'По рейтингу', isActive: false },
    { id: 'byDiscount', title: 'По скидке', isActive: false },
  ];

  return (
    <div className="catalog__page">
      {/* Информация о количесиве найденных товаров */}
      {!!search && (
        <p className="info_by_search">
          По запросу <b>{search}</b>{' '}
          {allProducts.length === 1 ? 'найден ' : 'найдено '}
          {allProducts.length}
          {changeWordByQuantity(allProducts.length, 'товар')}
        </p>
      )}

      {/* Уведомледние об отсутсвии продуктов по запросу */}
      {allProducts.length === 0 && search && (
        <NoProductsByQuery setSearch={setSearch} />
      )}

      {/* Сортировка на экранах от 680px */}
      {allProducts.length > 0 && (
        <div className="sort__cards__wrapper sort__cards__large">
          {sortArray.map((e, index) => (
            <span
              className={`sort_item ${
                isActive === index && 'sort_item__active'
              }`}
              key={e.id}
              onClick={() => {
                setIsActive(index);
                doSorting(e.id);
              }}
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

      <AllCardsList allProducts={allProducts} />
    </div>
  );
};
