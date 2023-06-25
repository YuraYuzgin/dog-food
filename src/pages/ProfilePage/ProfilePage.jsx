import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '../../components/Preloader/Preloader';
import { getUser, userAuthorized } from '../../storage/slices/userSlice';
import iconEmail from './img/ic-mail.svg';
import './index.sass';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(userAuthorized(false));
    navigate('/');
  };

  return (
    <>
      {loading && <Preloader />}
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
          <button
            className="profile__btn"
            onClick={() => navigate('/change-profile')}
          >
            Изменить
          </button>
          <button className="profile__btn" onClick={logout}>
            Выйти
          </button>
        </div>
      )}
    </>
  );
};
