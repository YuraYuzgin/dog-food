import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.sass';

export const BtnToHome = ({ setSearch }) => {
  const navigate = useNavigate();
  const toHome = () => {
    setSearch('');
    navigate('/');
  };

  return (
    <button className="btn_to_home" onClick={toHome}>
      На главную
    </button>
  );
};
