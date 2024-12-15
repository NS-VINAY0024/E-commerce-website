import React from 'react';
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

// Authentication
import SignUpPage from './Authentication/pages/SignUpPage';
import ResetPasswordPage from './Authentication/pages/ResetPasswordPage';
import LoginPage from './Authentication/pages/LoginPage';
import ForgotPasswordPage from './Authentication/pages/ForgotPasswordPage';
import EmailVerificationPage from "./Authentication/pages/EmailVerificationPage";
import FloatingShape from "./Authentication/components/FloatingShape";
import { useAuthStore } from "./Authentication/store/authstore";
import LoadingSpinner from "./Authentication/components/LoadingSpinner";

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

// Pages
import Map from './components/layout/components/Map';
import Items from './components/layout/components/ItemsDisplay';
import About from './components/layout/components/About';
import Contact from './components/layout/components/Contact';
import Settings from './components/layout/components/settings';
import Profile from './components/layout/components/profile';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart/Cart';
import ProductList from './pages/Products/productList';
import ProductDetail from './pages/Products/productDetail';
import PaymentPage from './pages/Payment/PaymentPage';
import FinalBillPage from './pages/FinalBill/FinalBillPage';


// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};
const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const location = useLocation(); // Get the current location();

  const useAuthPageCheck = () => {
    const location = useLocation();
    return (
      location.pathname === '/login' ||
      location.pathname === '/signup' ||
      location.pathname === '/forgot-password' ||
      location.pathname === '/reset-password'
    );
  };
  const isAuthPage = useAuthPageCheck();
    


  const isNotFoundPage = location.pathname !== '/' && ![
    '/login', '/items', '/map', '/about', '/contact', '/settings', '/profile', '/cart', '/products', '/products/:id', '/payment', '/final-bill', '/signup', '/forgot-password', '/reset-password'
  ].includes(location.pathname);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;


  return (
    <CartProvider>
      <NotificationProvider>
        <div className="min-h-screen flex flex-col">
          {/* Render Header and Footer only if not on auth pages and not on NotFound page */}
          {!isAuthPage && !isNotFoundPage && <Header />}

          <main className="min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc] flex items-center justify-center relative overflow-hidden"
          >
            <FloatingShape
              color="bg-[#0c11cb]"
              size="w-64 h-64"
              top="-5%"
              left="10%"
              delay={0}
            />
            <FloatingShape
              color="bg-[#fa11cb]"
              size="w-48 h-48"
              top="70%"
              left="80%"
              delay={5}
            />
            <FloatingShape
              color="bg-[#f575fc]"
              size="w-32 h-32"
              top="40%"
              left="-10%"
              delay={2}
            />

            <Routes>
              {/* Auth routes */}
              <Route
                path="/login"
                element={
                  <RedirectAuthenticatedUser>
                    <LoginPage />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route
                path="/signup"
                element={
                  <RedirectAuthenticatedUser>
                    <SignUpPage />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route path="/verify-email" element={<EmailVerificationPage />} />
              <Route
                path="/forgot-password"
                element={
                  <RedirectAuthenticatedUser>
                    <ForgotPasswordPage />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route
                path="/reset-password/:token"
                element={
                  <RedirectAuthenticatedUser>
                    <ResetPasswordPage />
                  </RedirectAuthenticatedUser>
                }
              />

              {/* Main routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>}
              />
              <Route
                path="/items"
                element={
                  <ProtectedRoute>
                    <Items />
                  </ProtectedRoute>}
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <Map />
                  </ProtectedRoute>}
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>}
              />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute>
                    <Contact />
                  </ProtectedRoute>}
              />

              {/* Profile and Settings routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>}
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>}
              />

              {/* Cart and product routes */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>}
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <ProductList />
                  </ProtectedRoute>}
              />
              <Route
                path="/products/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>}
              />

              {/* Payment and Final Bill routes */}
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>}
              />
              <Route
                path="/final-bill"
                element={
                  <ProtectedRoute>
                    <FinalBillPage />
                  </ProtectedRoute>}
              />

              {/* Fallback route for unmatched paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </main>

          {/* Render Footer only if not on auth pages and not on NotFound page */}
          {!isAuthPage && !isNotFoundPage && <Footer />}
        </div>
      </NotificationProvider>
    </CartProvider>
  );
};

export default App;
