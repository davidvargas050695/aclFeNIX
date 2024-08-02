import React from 'react';
import { Header, Footer, Menu, CartItem } from '../../components';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Menu />
      <main>{children}</main>
      <CartItem/>
      <Footer />
    </>
  );
};

export default Layout;
