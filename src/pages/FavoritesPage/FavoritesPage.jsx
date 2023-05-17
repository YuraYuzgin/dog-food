import React, { useContext } from 'react';
import { ProductCardContext } from '../../context/productCardContext';
import { AllCardsList } from '../../components/AllCardsList/AllCardsList';
import { BtnBack } from '../../components/Buttons/BtnBack/BtnBack';
import './index.sass';

export const FavoritesPage = () => {
  const { favorites } = useContext(ProductCardContext);
  return (
    <div className="favorites__page">
      <BtnBack />
      <h2 className="favorites__page__header">Избранное</h2>
      <AllCardsList allProducts={favorites} isFavorite={true} />
    </div>
  );
};
