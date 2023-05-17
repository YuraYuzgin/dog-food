// Получение данных о пользователе и всех продуктах
import { useEffect } from 'react';

export const useUserAndProductsData = ({
  api,
  setUser,
  setAllProducts,
  setError,
  setIsLoading,
  setFavorites,
}) => {
  useEffect(() => {
    Promise.all([api.getUserInfoByToken(), api.getAllProducts()])
      .then(([userData, productsData]) => {
        setUser(userData);
        setAllProducts(productsData.products);
        const favoritesProducts = productsData.products.filter((e) =>
          e.likes.some((elem) => elem === userData._id)
        );
        setFavorites(favoritesProducts);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [setAllProducts]);
};
