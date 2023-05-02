import { Outlet } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';

const Layout = () => {
  return (
    <div className="d-flex flex-column h-100">
      <MainNavbar />
      <div className="container flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
