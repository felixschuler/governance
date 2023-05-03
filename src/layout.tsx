import { Outlet } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';

const Layout = () => {
  return (
    <div>
      <MainNavbar />
      <div className="container pt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
