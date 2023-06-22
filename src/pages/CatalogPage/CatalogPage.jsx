import React, { useState, useEffect } from 'react';
import { AllCardsList } from '../../components/AllCardsList/AllCardsList';
import { NoProductsByQuery } from '../../components/NoProductsByQuery/NoProductsByQuery';
import './index.sass';
import iconSortUp from './img/sort-up-solid.svg';
import iconSortDown from './img/sort-down-solid.svg';
import { changeWordByQuantity } from '../../utils/changeWordByQuantity';
import { useDispatch, useSelector } from 'react-redux';
import { doSorting } from '../../storage/slices/productsSlice';
import { Preloader } from '../../components/Preloader/Preloader';

export const CatalogPage = ({ page, setPage, pageSize, setPageSize }) => {
  const allProducts = useSelector((state) => state.products.products);
  const search = useSelector((state) => state.products.searchQuery);
  const [currentSort, setCurrentSort] = useState(0);
  const [isActive, setIsActive] = useState(-1);
  const [showProducts, setShowProducts] = useState(allProducts.slice(1, 16));

  const dispatch = useDispatch();
  const productsIsLoading = useSelector((state) => state.products.loading);

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

  // Обработка изменения количества товаров на странице
  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    let newPageNumber = Math.floor((page * pageSize) / event.target.value);
    if (newPageNumber < 1) newPageNumber = 1;
    setPage(newPageNumber);
  };

  // Общее количество страниц
  const countPages = Math.ceil(allProducts.length / pageSize);

  // Создаём массив для отображения номеров страниц
  const arrayPages = [];
  for (let i = 0; i < countPages; i++) {
    arrayPages.push(i + 1);
  }

  // Смена страницы
  const goToCurrentPage = (event) => {
    setPage(event.target.textContent);
  };

  useEffect(() => {
    setShowProducts(allProducts.slice(pageSize * (page - 1), pageSize * page));
  }, [allProducts, page, pageSize]);

  return (
    <>
      {productsIsLoading && <Preloader />}
      {!productsIsLoading && (
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
          {allProducts.length === 0 && search && <NoProductsByQuery />}

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
                    dispatch(doSorting(e.id));
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
                onClick={() => dispatch(doSorting(sortArray[currentSort].id))}
              >
                {sortArray[currentSort].title}
              </p>
            </div>
          )}

          <AllCardsList allProducts={showProducts} />

          <div className="pagination__wrapper">
            <div className="page__size">
              <span>Количество продуктов на странице: </span>
              <select value={pageSize} onChange={handleChangePageSize}>
                <option value="16">16</option>
                <option value="32">32</option>
              </select>
            </div>
            <div className="page__number">
              {page > 1 && (
                <span
                  className="change__page__on__one"
                  onClick={() => setPage(1 * page - 1)}
                >
                  &lt;
                </span>
              )}
              {arrayPages.map((e, index) => (
                <span
                  className={`page__number__current ${
                    page - 1 === index && 'page__number__current__active'
                  }`}
                  key={index}
                  onClick={(event) => goToCurrentPage(event)}
                >
                  {e}
                </span>
              ))}
              {page < arrayPages.length && (
                <span
                  className="change__page__on__one"
                  onClick={() => setPage(1 * page + 1)}
                >
                  &gt;
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
