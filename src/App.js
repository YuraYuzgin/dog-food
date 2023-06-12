import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.sass';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useDebounce } from './hooks/useDebounce';
import { ErrorFetch } from './components/ErrorFetch/ErrorFetch';
import { Router } from './router/Router';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './storage/slices/userSlice';
import { fetchAllProducts, fetchProductsByQuery } from './storage/slices/productsSlice';

function App() {
  const [allProducts, setAllProducts] = useState([]);

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);

  const searchQuery = useSelector((state) => state.products.searchQuery);
  const debounceValueInApp = useDebounce(searchQuery);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: userData } = useSelector((state) => state.user);
  const products = useSelector((state) => state.products.products);

  // Получение данных о пользователе и всех продуктах
  // useEffect(() => {
  //   if (!isAuthorized) {
  //     navigate('/login');
  //   } else {
  //     dispatch(getUser()).then(() => {
  //       dispatch(fetchAllProducts());
  //     });
  //   }
  // }, [dispatch, isAuthorized, navigate]);

  useEffect(() => {
    dispatch(getUser()).then(() => dispatch(fetchAllProducts()));
  }, [dispatch]);

  // Отслеживание изменения запроса продуктов, выполнение запроса
  useEffect(() => {
    if (debounceValueInApp === null) { return; }
    dispatch(fetchProductsByQuery(debounceValueInApp));
  }, [debounceValueInApp, dispatch]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <div className="App">
        <Header setIsActiveModal={setIsActiveModal} />
        {!!error && <ErrorFetch />}
        <main className="container">
          {isLoading && <p className="loading">Загрузка...</p>}
          <Router
            isAuthorized={isAuthorized}
            allProducts={allProducts}

            isActiveModal={isActiveModal}
            setIsActiveModal={setIsActiveModal}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </main>
        <Footer />
    </div>
  );
}

export default App;
