import { useEffect } from 'react';
import './App.sass';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useDebounce } from './hooks/useDebounce';
import { Router } from './router/Router';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, userAuthorized } from './storage/slices/userSlice';
import {
  fetchAllProducts,
  fetchProductsByQuery,
} from './storage/slices/productsSlice';
import { parseJwt } from './utils/parseJwt';
import { Notification } from './components/Notification/Notification';

function App() {
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const dispatch = useDispatch();
  const errorProductsMessage = useSelector((state) => state.products?.error);
  const errorUserMessage = useSelector((state) => state.user?.error);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  // Проверка токена
  useEffect(() => {
    const token = parseJwt(localStorage.getItem('token'));
    if (token && new Date() < new Date(token?.exp * 1000)) {
      dispatch(userAuthorized(true));
    } else {
      dispatch(userAuthorized(false));
    }
  }, [dispatch]);

  // Создание паузы между введением символа в поле запроса и отправкой запроса на сервер
  const debounceValueInApp = useDebounce(searchQuery);

  // Получение данных о пользователе и всех продуктах
  useEffect(() => {
    if (!isAuthorized) {
      return;
    } else {
      dispatch(getUser()).then(() => {
        dispatch(fetchAllProducts());
      });
    }
  }, [dispatch, isAuthorized]);

  // Отслеживание изменения запроса продуктов, выполнение запроса
  useEffect(() => {
    if (debounceValueInApp === null) {
      return;
    }
    dispatch(fetchProductsByQuery(debounceValueInApp));
  }, [debounceValueInApp, dispatch]);

  return (
    <div className="App">
      <Header />
      <main className="container">
        {!!errorProductsMessage && (
          <Notification type="error">{errorProductsMessage}</Notification>
        )}
        {!!errorUserMessage && (
          <Notification type="error">{errorUserMessage}</Notification>
        )}
        <Router />
      </main>
      <Footer />
    </div>
  );
}

export default App;
