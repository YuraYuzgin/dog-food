import React from 'react';
import { Logo } from '../Logo/logo';
import './index.css';
import { Search } from '../Search/Search';
import iconFavorites from './img/favorites.svg';
import iconCart from './img/cart.svg';
import iconProfile from './img/profile.svg';

export const Header = ({ setSearch }) => {
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <Search setSearch={setSearch} />
        <div className="header__icons">
          <div>
            <img src={iconFavorites} />
          </div>
          <div>
            <img src={iconCart} />
          </div>
          <div>
            <img src={iconProfile} />
          </div>
        </div>
      </div>
    </header>
  );
};
