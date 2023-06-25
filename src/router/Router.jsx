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
import { ChangeProfilePage } from '../pages/ChangeProfilePage/ChangeProfilePage';
import { BasketPage } from '../pages/BasketPage/BasketPage';
import { useSelector } from 'react-redux';
import { NotAuthorized } from '../components/NotAuthorized/NotAuthorized';

export const Router = () => {
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const authRoutes = (
    <>
      <Route
        path="/registration"
        element={
          <Modal>
            <RegistrationForm />
          </Modal>
        }
      />
      <Route
        path="/login"
        element={
          <Modal>
            <LoginForm />
          </Modal>
        }
      />
      <Route
        path="/password-reset"
        element={
          <Modal>
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
          <Route path="/" element={<CatalogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-profile" element={<ChangeProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/basket" element={<BasketPage />} />
          {authRoutes}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<NotAuthorized />} />
          {authRoutes}
        </Routes>
      )}
    </>
  );
};
