import { useState } from 'react';
import './App.sass';
import { AllCardsList } from './components/AllCardsList/AllCardsList';
import { Header } from './components/Header/Header';
import { api } from './utils/api';
import { useDebounce } from './hooks/useDebounce';
import { Footer } from './components/Footer/Footer';
import { useUserAndProductsData } from './hooks/useUserAndProductsData';
import { useValueInSearch } from './hooks/useValueInSearch';
import { ErrorFetch } from './components/ErrorFetch/ErrorFetch';

function App() {
  const [user, setUser] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="App">
      <Header setSearch={setSearch} />
      {!!error && <ErrorFetch />}
      <main className="container">
        {isLoading && <p>Загрузка...</p>}
        <AllCardsList
          userId={user._id}
          allProducts={allProducts}
          changeLike={changeLike}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
