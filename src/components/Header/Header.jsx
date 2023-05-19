import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/logo';
import './index.sass';
import { Search } from '../Search/Search';
import iconFavorites from './img/favorites.svg';
import iconCart from './img/cart.svg';
import iconProfile from './img/profile.svg';

export const Header = memo(({ setSearch, favorites }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        {location.pathname === '/' && <Search setSearch={setSearch} />}
        <div className="header__icons">
          <Link to={'/favorites'}>
            <div className="header__container__favorites">
              {!!favorites.length && (
                <span className="favorites__bubble">{favorites.length}</span>
              )}
              <img src={iconFavorites} alt="favorites" />
            </div>
          </Link>
          <div>
            <img src={iconCart} alt="cart" />
          </div>
          <div>
            <img src={iconProfile} alt="profile" />
          </div>
        </div>
      </div>
    </header>
  );
});
