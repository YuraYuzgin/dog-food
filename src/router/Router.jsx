import { Routes, Route } from 'react-router-dom';
import { CatalogPage } from '../pages/CatalogPage/CatalogPage';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

export const Router = ({ isAuthorized, allProducts, setError }) => {
  return (
    <>
      {isAuthorized ? (
        <Routes>
          <Route path="/" element={<CatalogPage allProducts={allProducts} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route
            path="/product/:id"
            element={<ProductPage setError={setError} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/not-auth" element={<div>Not authorized user.</div>} />
        </Routes>
      )}
    </>
  );
};
