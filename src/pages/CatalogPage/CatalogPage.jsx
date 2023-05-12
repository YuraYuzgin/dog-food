import React from 'react';
import { AllCardsList } from '../../components/AllCardsList/AllCardsList';
import { NoProductsByQuery } from '../../components/NoProductsByQuery/NoProductsByQuery';
import './index.sass';

export const CatalogPage = ({
  user,
  allProducts,
  changeLike,
  search,
  doSorting,
  setSearch
}) => {
  // Изменеие окончания слова в зависимости от количества товаров
  const changeWordByQuantity = (count) => {
    const remainder = count % 10;
    if (!remainder || !count) {
      return ' товаров';
    }
    if (remainder === 1) {
      return ' товар';
    }
    if (remainder > 1 && remainder < 5) {
      return ' товара';
    }
    if (remainder >= 5 && remainder <= 9) {
      return ' товаров';
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
      {(allProducts.length === 0 && search) && <NoProductsByQuery setSearch={setSearch} />}

      {(allProducts.length > 0) && <div className="sort__cards__wrapper">
        {sortArray.map((e) => (
          <span
            className="sort_item"
            key={e.id}
            onClick={() => doSorting(e.id)}
          >
            {e.title}
          </span>
        ))}
      </div>}

      <AllCardsList
        userId={user._id}
        allProducts={allProducts}
        changeLike={changeLike}
      />
    </div>
  );
};
