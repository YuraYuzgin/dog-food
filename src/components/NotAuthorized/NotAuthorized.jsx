import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeActiveModal } from '../../storage/slices/modalSlice';
import './index.sass';

export const NotAuthorized = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toLogin = () => {
    dispatch(changeActiveModal(true));
    navigate('/login');
  };
  const toRegistration = () => {
    dispatch(changeActiveModal(true));
    navigate('/registration');
  };

  return (
    <div className="not_authorized">
      <h4 className="not_authorized__header">Добро пожаловать!</h4>
      <div className="not_authorized__links">
        <span onClick={toLogin} className="not_authorized__links__link">
          Авторизуйтесь
        </span>
        <span> или </span>
        <span onClick={toRegistration} className="not_authorized__links__link">
          зарегистрируйтесь.
        </span>
      </div>
    </div>
  );
};
