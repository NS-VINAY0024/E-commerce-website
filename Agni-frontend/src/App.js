import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import Map from './components/layout/Header_contents/Map'
import Items from './components/layout/Header_contents/Items';
import Footer from './components/layout/Footer';
import AuthPages from './components/auth/AuthPages';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<AuthPages />} />
            <Route path="/signup" element={<AuthPages />} />
            <Route path="/forgot-password" element={<AuthPages />} />
            <Route path="/reset-password" element={<AuthPages />} />

            {/* Main routes */}
            <Route path="/" element={<MainContent />} />
            <Route path="/items" element={<Items />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;