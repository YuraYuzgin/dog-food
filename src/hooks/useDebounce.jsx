import { useEffect, useState } from 'react';

// Создание паузы между введением символа в поле запроса и отправкой запроса на сервер
export const useDebounce = (path) => {
  const [debounceValue, setDebounceValue] = useState(path);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(path);
    }, 400);

    // обращается к предыдущему таймауту
    return () => clearTimeout(timeout);
  }, [path]);

  return debounceValue;
};
