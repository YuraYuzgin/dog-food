// Получение данных о пользователе и всех продуктах
import { useEffect } from 'react';

export const useUserAndProductsData = ({
  api,
  setUser,
  setAllProducts,
  setError,
  setIsLoading,
}) => {
  useEffect(() => {
    Promise.all([api.getUserInfoByToken(), api.getAllProducts()])
      .then(([userData, productsData]) => {
        setUser(userData);
        setAllProducts(productsData.products);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [setAllProducts]);
};
