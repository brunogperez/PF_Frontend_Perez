import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { InicioPage } from '../pages/InicioPage';
import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect } from 'react';
import { LoadingComponent } from '../components/LoadingComponent';
import { MyCartPage } from '../pages/MyCartPage';
import { ProductPage } from '../pages/ProductPage';
import { AdminProductPage } from '../pages/AdminProductPage';
import { AddProductPage } from '../pages/AddProductPage';
import { NavBar } from '../components/NavBar';
import { UsersPage } from '../pages/UsersPage';
import { EditProductPage } from '../pages/EditProductPage';
import { MyCompras } from '../pages/MyCompras';
import { ResetPasswordEmailPage } from '../pages/ResetPasswordEmailPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { Chat } from '../components/Chat';

export const AppRouter = () => {
  const { status, startCheckingLogin, isAdmin } = useAuthStore();

  useEffect(() => {
    startCheckingLogin();
  }, []);

  if (status === 'checking') return <LoadingComponent />;

  return (
    <>
      <NavBar />
      <Routes>
        {status === 'not-authenticated' ? (
          <>
            <Route path="/" element={<InicioPage />} />
            <Route path="/session/login" element={<LoginPage />} />
            <Route path="/session/register" element={<RegisterPage />} />
            <Route path="/session/email" element={<ResetPasswordEmailPage />} />
            <Route path="/session/reset-password" element={<ResetPasswordPage />} />
          </>
        ) : (
          <>
            <Route path="/chat" element={<Chat />} />
            <Route path="/mis-compras" element={<MyCompras />} />
            <Route path="/mi-carrito" element={<MyCartPage />} />
            <Route path="/users-page" element={<UsersPage />} />
            <Route path="/admin-product" element={<AdminProductPage />} />
            {isAdmin && (
              <>
                <Route path="/admin-product/add" element={<AddProductPage />} />
                <Route path="/admin-product/edit/:id" element={<EditProductPage />} />
              </>
            )}
          </>
        )}
        <Route path="/" element={<InicioPage />} />
        <Route path="/product/*" element={<ProductPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
