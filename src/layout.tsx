import { Outlet } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';

const Layout = () => {
  return (
    <div className="d-flex flex-column">
      <MainNavbar />
      <div className="container flex-fill">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
