import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { api } from '../../../utils/api';
import { Btn } from '../../Buttons/Btn/Btn';
import '../index.sass';
import {
  emailRegister,
  passwordRegister,
  groupRegister,
} from '../../../validator/formValidator';
import eye from '../../../assets/img/eye.svg';
import eyeSlash from '../../../assets/img/eye-slash.svg';
import { useDispatch } from 'react-redux';
import { addUserError } from '../../../storage/slices/userSlice';

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const sendData = async (data) => {
    try {
      await api.signup(data);
      window.location.replace(`${window.location.origin}/login`);
    } catch (error) {
      dispatch(addUserError(error));
    }
  };

  return (
    <div className="auth_form">
      <div className="auth_form__header">
        <h2>Регистрация</h2>
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

        <div>
          <input
            className="auth_form__form__input"
            type="number"
            placeholder="Введите номер группы..."
            {...register('group', { ...groupRegister })}
          />
          {errors?.group && (
            <span className="auth_form__form__input__errors">
              {errors?.group.message}
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

        <div className="auth_form__form__info">
          <span className="auth_form__form__info__text">
            Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
            Политикой конфиденциальности и соглашаетесь на информационную
            рассылку.
          </span>
        </div>

        <div className="auth_form__form__btns">
          <Btn type="submit" className="for" color="yellow">
            Зарегистрироваться
          </Btn>

          <Link className="link_style" to={'/login'}>
            <Btn color="white">Войти</Btn>
          </Link>
        </div>
      </form>
    </div>
  );
};
