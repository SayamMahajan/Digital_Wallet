import React from 'react';
import Sidebar from '../Sidebar';
import HeaderTitle from '../HeaderTitle';
import './Layout.css';

const Layout = ({ children, showHeader = true, showSidebar = true }) => {
  return (
    <div className="layout">
      {showSidebar && (
        <div className="layout__sidebar">
          <Sidebar />
        </div>
      )}
      <div className="layout__body">
        {showHeader && <HeaderTitle />}
        <div className="layout__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;