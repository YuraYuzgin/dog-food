import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../../utils/api';
import { Btn } from '../../Buttons/Btn/Btn';
import '../index.sass';
import {
  emailRegister,
  tokenRegister,
  passwordRegister,
} from '../../../validator/formValidator';
import eye from '../../../assets/img/eye.svg';
import eyeSlash from '../../../assets/img/eye-slash.svg';
import { useDispatch } from 'react-redux';
import { addUserError } from '../../../storage/slices/userSlice';
import { BtnBack } from '../../Buttons/BtnBack/BtnBack';

export const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isHaveToken, setIsHaveToken] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const sendData = async (data) => {
    if (data.token) {
      try {
        const result = await api.changePassword(
          { password: data.password },
          data.token
        );
        localStorage.setItem('token', result.token);
        window.location.replace(window.location.origin);
      } catch (error) {
        dispatch(addUserError(error));
      }
    } else {
      try {
        await api.passwordReset(data);
        setIsHaveToken(true);
      } catch (error) {
        dispatch(addUserError(error));
      }
    }
  };

  return (
    <div className="auth_form">
      <div className="auth_form__header__reset_pass">
        <h2>Восстановление пароля</h2>
      </div>

      <div className="auth_form__back"><BtnBack className="auth_form__back" /></div>

      <div className="auth_form__form__info">
        <span className="auth_form__form__info__text__for_reset">
          {!isHaveToken &&
            `Для получения временного пароля необходимо ввести email, указанный при
          регистрации.`}
        </span>
      </div>

      <form className="auth_form__form" onSubmit={handleSubmit(sendData)}>
        {!isHaveToken && (
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
        )}

        {isHaveToken && (
          <>
            <div>
              <input
                className="auth_form__form__input"
                type="text"
                placeholder="Введите токен..."
                {...register('token', { ...tokenRegister })}
              />
              {errors?.token && (
                <span className="auth_form__form__input__errors">
                  {errors?.token.message}
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
          </>
        )}

        <div className="auth_form__form__info">
          <span className="auth_form__form__info__text__for_reset">
            Срок действия временного пароля 24 ч.
          </span>
        </div>

        <div className="auth_form__form__btns">
          <Btn type="submit" className="for" color="yellow">
            Отправить
          </Btn>
        </div>
      </form>
    </div>
  );
};
