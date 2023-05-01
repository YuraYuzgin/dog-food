const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'Content-Type': 'application/json',
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNlZDFjNzMyOTFkNzkwYjNmMzRkMWEiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgxODM4ODk2LCJleHAiOjE3MTMzNzQ4OTZ9.6TJwVndTd3pnfSuNuqVFRwe3CM_jx_TshJp8yC5L5mE',
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('error');
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

  // Добавление/удаление лайка
  changeLike(productId, isLike) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      method: isLike ? 'DELETE' : 'PUT',
      headers: this.headers,
    }).then(onResponse);
  }
}

export const api = new Api(config);