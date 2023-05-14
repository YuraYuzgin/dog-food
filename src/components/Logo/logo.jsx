import React from 'react';
import logo from './logo.svg';

export const Logo = () => {
  return (
    <a href="/">
      <img src={logo} alt="logo" className='logo_img' />
    </a>
  );
};
