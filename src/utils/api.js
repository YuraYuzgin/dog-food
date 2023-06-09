const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token'),
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
};

class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  // получение информации о пользователе по токену
  getUserInfoByToken() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(onResponse);
  }

  // Получение всех товаров
  getAllProducts() {
    return fetch(`${this.baseUrl}/products`, {
      headers: this.headers,
    }).then(onResponse);
  }

  // Поиск товаров
  getProductsByQuery(path) {
    return fetch(`${this.baseUrl}/products/search?query=${path}`, {
      headers: this.headers,
    }).then(onResponse);
  }

  // Получение товaра по id
  getProductById(id) {
    return fetch(`${this.baseUrl}/products/${id}`, {
      headers: this.headers,
    }).then(onResponse);
  }

  // Добавление/удаление лайка
  changeLike(productId, isLike) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      method: isLike ? 'DELETE' : 'PUT',
      headers: this.headers,
    }).then(onResponse);
  }

  // Добавление отзыва по id продукта
  addReviewByIdProduct(productId, data) {
    return fetch(`${this.baseUrl}/products/review/${productId}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(onResponse);
  }

  // Удаление отзыва по id
  deleteReviewById(productId, reviewId) {
    return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(onResponse);
  }

  // Вход в аккаунт
  signin(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(onResponse);
  }

  // Регистрация
  signup(data) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(onResponse);
  }

  // Сброс пароля
  passwordReset(data) {
    return fetch(`${this.baseUrl}/forgot-password`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(onResponse);
  }

  // Смена пароля (с новым токеном)
  changePassword(data, token) {
    return fetch(`${this.baseUrl}/password-reset/${token}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(onResponse);
  }

  // Изменение аватара
  changeAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(onResponse);
  }

  // Изменение информации о пользователе
  changeUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(onResponse);
  }
}

export const api = new Api(config);
