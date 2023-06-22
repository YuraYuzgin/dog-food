import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BtnBack } from '../../components/Buttons/BtnBack/BtnBack';
import {
  fetchChangeAvatar,
  fetchChangeUserInfo,
} from '../../storage/slices/userSlice';
import {
  aboutRegister,
  avatarRegister,
  nameRegister,
} from '../../validator/formValidator';
import { Notification } from '../../components/Notification/Notification';
import './index.sass';

export const ChangeProfilePage = () => {
  const [isNotification, setIsNotification] = useState(false);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const sendData = (data) => {
    if (data.avatar !== user.avatar) {
      const dataAvatar = { avatar: data.avatar };
      dispatch(fetchChangeAvatar(dataAvatar));
    }
    if (data.name !== user.name || data.about !== user.about) {
      const dataUserInfo = { name: data.name, about: data.about };
      dispatch(fetchChangeUserInfo(dataUserInfo));
    }
    setIsNotification(true);
    reset();
  };

  const success = { message: 'Изменения внесены.' };

  return (
    <div className="change__profile">
      {isNotification && <Notification type="success">{success}</Notification>}
      <BtnBack />
      <h2 className="change__profile__header">Мои данные</h2>

      <form className="change__profile__form" onSubmit={handleSubmit(sendData)}>
        <label htmlFor="avatar" className="change__profile__form__label">
          Изменить аватар:
        </label>
        <input
          id="avatar"
          type="text"
          placeholder="Введите ссылку на изображение..."
          defaultValue={user?.avatar}
          {...register('avatar', { ...avatarRegister })}
          className="change__profile__form__input"
        />
        {errors?.avatar && (
          <span className="change__profile__form__errors">
            {errors.avatar.message}
          </span>
        )}

        <label htmlFor="name" className="change__profile__form__label">
          Изменить имя:
        </label>
        <input
          id="name"
          type="text"
          placeholder="Введите имя..."
          defaultValue={user?.name}
          {...register('name', { ...nameRegister })}
          className="change__profile__form__input"
        />
        {errors?.name && (
          <span className="change__profile__form__errors">
            {errors.name.message}
          </span>
        )}

        <label htmlFor="about" className="change__profile__form__label">
          Изменить информацию о себе:
        </label>
        <input
          id="about"
          type="text"
          placeholder="Введите информацию о себе..."
          defaultValue={user?.about}
          {...register('about', { ...aboutRegister })}
          className="change__profile__form__input"
        />
        {errors?.about && (
          <span className="change__profile__form__errors">
            {errors.about.message}
          </span>
        )}
        <button type="submit" className="change__profile__form__btn">
          Отправить
        </button>
      </form>
    </div>
  );
};
