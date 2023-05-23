import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { api } from '../../../utils/api';
import { Btn } from '../../Buttons/Btn/Btn';
import '../index.sass';
import {
  emailRegister,
  passwordRegister,
} from '../../../validator/authValidator';
import eye from '../../../assets/img/eye.svg';
import eyeSlash from '../../../assets/img/eye-slash.svg';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const sendData = async (data) => {
    try {
      const result = await api.signin(data);
      localStorage.setItem('token', result.token);
      window.location.replace(window.location.origin);
    } catch (error) {
      alert('Ошибка.');
    }
  };

  return (
    <div className="auth_form">
      <div className="auth_form__header">
        <h2>Вход</h2>
      </div>

      <form className="auth_form__form" onSubmit={handleSubmit(sendData)}>
        <div>
          <input
            className="auth_form__form__input"
            type="text"
            placeholder="Введите email..."
            {...register('email', { ...emailRegister })}
          />
          {errors?.email && (
            <span className="auth_form__form__input__errors">
              {errors?.email.message}
            </span>
          )}
        </div>

        <div className="input__password">
          <input
            className="auth_form__form__input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите пароль..."
            {...register('password', { ...passwordRegister })}
          />
          {errors?.password && (
            <span className="auth_form__form__input__errors">
              {errors?.password.message}
            </span>
          )}
          <span
            className="input__password__icon_show_pass"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {!showPassword ? (
              <img src={eye} alt="eye" />
            ) : (
              <img src={eyeSlash} alt="eye-slash" />
            )}
          </span>
        </div>

        <div className="auth_form__form__reset_pass">
          <Link className="link_style" to={'/password-reset'}>
            <span className="auth_form__form__reset_pass__text">
              Восстановить пароль
            </span>
          </Link>
        </div>

        <div className="auth_form__form__btns">
          <Btn type="submit" className="for" color="yellow">
            Войти
          </Btn>

          <Link className="link_style" to={'/registration'}>
            <Btn color="white">Регистрация</Btn>
          </Link>
        </div>
      </form>
    </div>
  );
};
