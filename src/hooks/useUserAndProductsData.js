// Получение данных о пользователе и всех продуктах
import { useEffect } from 'react';

export const useUserAndProductsData = ({ api, setUser, setAllProducts }) => {
  useEffect(() => {
    Promise.all([api.getUserInfoByToken(), api.getAllProducts()]).then(
      ([userData, productsData]) => {
        setUser(userData);
        setAllProducts(productsData.products);
      }
    );
  }, []);
};
