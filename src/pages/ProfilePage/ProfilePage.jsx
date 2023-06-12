import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../storage/slices/userSlice';
import iconEmail from './img/ic-mail.svg';
import './index.sass';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      {!loading && (
        <div className="profile">
          <h2 className="profile__header">Профиль</h2>
          <img className="profile__avatar" src={user.avatar} alt="avatar" />
          <h3 className="profile__name">{user.name}</h3>
          <p className="profile__about">{user.about}</p>
          <div className="profile__email__wrapper">
            <img src={iconEmail} alt="email" />
            <p className="profile__email">{user.email}</p>
          </div>
          <button className="profile__btn">Изменить</button>
          <button className="profile__btn">Выйти</button>
        </div>
      )}
    </>
  );
};
