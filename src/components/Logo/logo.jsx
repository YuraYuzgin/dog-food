import React from 'react';
import logo from './img/logo.svg';
import logoMin from './img/logo-min.svg';
import './index.sass';

export const Logo = () => {
  return (
    <a href="/">
      <img src={logo} alt="logo" className="logo_img" />
      <img src={logoMin} alt="logo" className="logo_min_img" />
    </a>
  );
};
