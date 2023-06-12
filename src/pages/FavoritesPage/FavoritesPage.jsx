import { AllCardsList } from '../../components/AllCardsList/AllCardsList';
import { BtnBack } from '../../components/Buttons/BtnBack/BtnBack';
import './index.sass';
import { useSelector } from 'react-redux';

export const FavoritesPage = () => {
  const favorites = useSelector((state) => state.products.favoritesProducts);
  return (
    <div className="favorites__page">
      <BtnBack />
      <h2 className="favorites__page__header">Избранное</h2>
      <AllCardsList allProducts={favorites} isFavorite={true} />
    </div>
  );
};
