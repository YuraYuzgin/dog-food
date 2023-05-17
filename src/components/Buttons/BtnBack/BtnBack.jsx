import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconLeftArrow from './img/ic-left-arrow.svg';
import './index.sass';

export const BtnBack = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <div onClick={() => back()} className="btn_back">
      <img src={iconLeftArrow} alt="left arrow" />
      <span className="btn_back__text">Назад</span>
    </div>
  );
};
