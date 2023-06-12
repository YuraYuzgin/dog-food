import { Routes, Route } from 'react-router-dom';
import { CatalogPage } from '../pages/CatalogPage/CatalogPage';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { Modal } from '../components/Modal/Modal';
import { LoginForm } from '../components/Auth/LoginForm/LoginForm';
import { RegistrationForm } from '../components/Auth/RegistrationForm/RegistrationForm';
import { ResetPasswordForm } from '../components/Auth/ResetPasswordForm/ResetPasswordForm';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';

export const Router = ({
  isAuthorized,
  isActiveModal,
  setIsActiveModal,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const authRoutes = (
    <>
      <Route
        path="/registration"
        element={
          <Modal
            isActiveModal={isActiveModal}
            setIsActiveModal={setIsActiveModal}
          >
            <RegistrationForm />
          </Modal>
        }
      />
      <Route
        path="/login"
        element={
          <Modal
            isActiveModal={isActiveModal}
            setIsActiveModal={setIsActiveModal}
          >
            <LoginForm />
          </Modal>
        }
      />
      <Route
        path="/password-reset"
        element={
          <Modal
            isActiveModal={isActiveModal}
            setIsActiveModal={setIsActiveModal}
          >
            <ResetPasswordForm />
          </Modal>
        }
      />
    </>
  );

  return (
    <>
      {isAuthorized ? (
        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          {authRoutes}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<div>Not authorized user.</div>} />
        </Routes>
      )}
    </>
  );
};
