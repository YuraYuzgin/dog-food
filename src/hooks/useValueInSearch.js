// Отслеживание изменения запроса продуктов, выполнение запроса
import { useEffect } from 'react';

export const useValueInSearch = ({
  debounceValueInApp,
  api,
  setAllProducts,
}) => {
  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    api
      .getProductsByQuery(debounceValueInApp)
      .then((data) => setAllProducts(data));
  }, [debounceValueInApp]);
};
