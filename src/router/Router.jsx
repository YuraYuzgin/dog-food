import { Routes, Route } from 'react-router-dom';
import { CatalogPage } from '../pages/CatalogPage/CatalogPage';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

export const Router = ({
  isAuthorized,
  user,
  allProducts,
  changeLike,
  setError,
  search,
  doSorting,
  setSearch,
}) => {
  return (
    <>
      {isAuthorized ? (
        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage
                user={user}
                allProducts={allProducts}
                changeLike={changeLike}
                search={search}
                doSorting={doSorting}
                setSearch={setSearch}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage
                setError={setError}
                user={user}
                changeLike={changeLike}
              />
            }
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
