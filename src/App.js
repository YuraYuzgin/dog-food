import { useState } from 'react';
import './App.sass';
import { Header } from './components/Header/Header';
import { api } from './utils/api';
import { useDebounce } from './hooks/useDebounce';
import { Footer } from './components/Footer/Footer';
import { useUserAndProductsData } from './hooks/useUserAndProductsData';
import { useValueInSearch } from './hooks/useValueInSearch';
import { ErrorFetch } from './components/ErrorFetch/ErrorFetch';
import { Router } from './router/Router';

function App() {
  const [user, setUser] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // не доработано
  const [isAuthorized, setIsAuthorized] = useState(true);

  const debounceValueInApp = useDebounce(search);

  // Получение данных о пользователе и всех продуктах
  useUserAndProductsData({
    api,
    setUser,
    setAllProducts,
    setError,
    setIsLoading,
  });

  // Отслеживание изменения запроса продуктов, выполнение запроса
  useValueInSearch({ debounceValueInApp, api, setAllProducts, setError });

  // Добавление/удаление лайка
  const changeLike = async (product, isLike) => {
    const updatedProduct = await api.changeLike(product._id, isLike);
    const index = allProducts.findIndex((e) => e._id === updatedProduct._id);
    if (index !== -1) {
      setAllProducts((state) => [
        ...state.slice(0, index),
        updatedProduct,
        ...state.slice(index + 1),
      ]);
    }
  };

  const ratingProduct = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const sumReviews = reviews.reduce(
      (accumulator, elem) => accumulator + elem.rating,
      0
    );
    return sumReviews / reviews.length;
  };

  // Сортировка продуктов
  const doSorting = (sortCategoryId) => {
    switch (sortCategoryId) {
      case 'popular':
        return setAllProducts((state) => [
          ...state.sort((a, b) => b.likes.length - a.likes.length),
        ]);
      case 'novelties':
        return setAllProducts((state) => [
          ...state.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          ),
        ]);
      case 'cheapFirst':
        return setAllProducts((state) => [
          ...state.sort((a, b) => a.price - b.price),
        ]);
      case 'expensiveFirst':
        return setAllProducts((state) => [
          ...state.sort((a, b) => b.price - a.price),
        ]);
      case 'byRating':
        return setAllProducts((state) => [
          ...state.sort(
            (a, b) => ratingProduct(b.reviews) - ratingProduct(a.reviews)
          ),
        ]);
      case 'byDiscount':
        return setAllProducts((state) => [
          ...state.sort((a, b) => b.discount - a.discount),
        ]);
      default:
        break;
    }
  };

  return (
    <div className="App">
      <Header setSearch={setSearch} />
      {!!error && <ErrorFetch />}
      <main className="container">
        {isLoading && <p className="loading">Загрузка...</p>}
        <Router
          isAuthorized={isAuthorized}
          user={user}
          allProducts={allProducts}
          changeLike={changeLike}
          setError={changeLike}
          search={search}
          doSorting={doSorting}
          setSearch={setSearch}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
