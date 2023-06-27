import { AllCardsList } from '../../components/AllCardsList/AllCardsList';
import { BtnBack } from '../../components/Buttons/BtnBack/BtnBack';
import './index.sass';
import { useSelector } from 'react-redux';
import { NoFavorites } from '../../components/NoFavorites/NoFavorites';

export const FavoritesPage = () => {
  const favorites = useSelector((state) => state.products.favoritesProducts);
  return (
    <div className="favorites__page">
      <BtnBack />
      <h2 className="favorites__page__header">Избранное</h2>
      {favorites.length ? (
        <AllCardsList allProducts={favorites} isFavorite={true} />
      ) : (
        <NoFavorites />
      )}
    </div>
  );
};
