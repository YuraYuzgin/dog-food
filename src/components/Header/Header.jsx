import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/logo';
import './index.sass';
import { Search } from '../Search/Search';
import iconFavorites from './img/favorites.svg';
import iconCart from './img/cart.svg';
import iconProfile from './img/profile.svg';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveModal } from '../../storage/slices/modalSlice';

export const Header = memo(() => {
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const favorites = useSelector((state) => state.products.favoritesProducts);
  const goods = useSelector((state) => state.basket.goods);
  const location = useLocation();
  const dispatch = useDispatch();

  const goodsCount = goods.reduce((sum, currentGood) => {
    return sum + currentGood.count;
  }, 0);

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        {location.pathname === '/' && <Search />}
        <div className="header__icons">
          <Link to={'/favorites'}>
            <div className="header__container__favorites">
              {!!favorites.length && (
                <span className="favorites__bubble bubble">
                  {favorites.length}
                </span>
              )}
              <img src={iconFavorites} alt="favorites" />
            </div>
          </Link>
          <div className="header__container__basket">
            <Link to={'/basket'}>
              {!!goodsCount && (
                <span className="basket__bubble bubble">{goodsCount}</span>
              )}
              <img src={iconCart} alt="cart" />
            </Link>
          </div>
          <div>
            {isAuthorized ? (
              <Link to={'/profile'}>
                <img src={iconProfile} alt="profile" />
              </Link>
            ) : (
              <Link
                to={'/login'}
                onClick={() => dispatch(changeActiveModal(true))}
              >
                <img src={iconProfile} alt="profile" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});
