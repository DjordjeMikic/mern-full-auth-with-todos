import React from 'react';
import Nav from './nav';

const Layout = ({ children }) => {
  return (
    <div className="flex column start hgh">
      <Nav />
      {children}
    </div>
  )
}


export default Layout;
