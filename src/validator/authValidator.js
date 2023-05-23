export const emailRegister = {
  required: { value: true, message: 'Введите email.' },
};

export const passwordRegister = {
  required: {
    value: true,
    message: 'Введите пароль.',
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message:
      'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру',
  },
};

export const groupRegister = {
  required: {
    value: true,
    message: 'Введите номер группы.',
  },
};

export const tokenRegister = {
  required: { value: true, message: 'Введите токен.' },
};
