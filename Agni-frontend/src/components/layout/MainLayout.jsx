import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      {" "}
      {/* Added background color */}
      <header>
        <Header />
      </header>
      <main className="flex-grow container mx-auto max-w-full">
        {/* Added max width for better control */}
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

// Prop Types validation
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is passed as a prop
};

export default Layout;
