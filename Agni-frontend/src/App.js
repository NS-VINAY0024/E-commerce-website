import React from 'react';
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";


// Authentication
import SignUpPage from './Authentication/pages/SignUpPage';
import ResetPasswordPage from './Authentication/pages/ResetPasswordPage';
import LoginPage from './Authentication/pages/LoginPage';
import ForgotPasswordPage from './Authentication/pages/ForgotPasswordPage';
import EmailVerificationPage from "./Authentication/pages/EmailVerificationPage";
import FloatingShape from "./Authentication/components/FloatingShape";
import useAuthStore from "./Store/authstore";
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
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

const AUTH_PATHS = new Set([
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-email",
]);

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const IsAdmin = ({ children }) => {
  const { user } = useAuthStore();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const location = useLocation();
  const isAuthPage =
    AUTH_PATHS.has(location.pathname) ||
    location.pathname.startsWith("/reset-password/");



  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;


  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {!isAuthPage && <Header />}

      <main className={`relative flex-1 overflow-hidden ${
        isAuthPage
          ? "min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc] flex items-center justify-center"
          : ""
      }`}
      >
        {isAuthPage && (
          <>
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
          </>
        )}
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

          <Route
            path="/secret-dashboard"
            element={
              <ProtectedRoute>
                <IsAdmin>
                  <AdminPage />
                </IsAdmin>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:category"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-success"
            element={
              <ProtectedRoute>
                <PurchaseSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-cancel"
            element={
              <ProtectedRoute>
                <PurchaseCancelPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </main>

      {!isAuthPage && <Footer />}
    </div>

  );
};

export default App;
