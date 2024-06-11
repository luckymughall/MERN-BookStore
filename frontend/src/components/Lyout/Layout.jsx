// Layout.js
import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Layout = ({ showBg, children }) => {
  return (
    <div className={showBg ? 'bg-my-bg-image bg-cover bg-no-repeat bg-center min-h-screen flex flex-col' : 'min-h-screen flex flex-col'}>
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
