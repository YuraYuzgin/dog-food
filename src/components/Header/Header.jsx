import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/logo';
import './index.sass';
import { Search } from '../Search/Search';
import iconFavorites from './img/favorites.svg';
import iconCart from './img/cart.svg';
import iconProfile from './img/profile.svg';
import { useSelector } from 'react-redux';

export const Header = memo(({ setIsActiveModal }) => {
  const favorites = useSelector((state) => state.products.favoritesProducts);
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        {location.pathname === '/' && <Search />}
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
            <Link to={'/login'} onClick={() => setIsActiveModal(true)}>
              <img src={iconProfile} alt="profile" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});
