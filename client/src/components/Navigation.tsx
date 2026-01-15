import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userService } from '../services/UserService';
import { LoadingContext } from '../context/LoadingContext';
export const Navigation = () => {
  const auth = useContext(AuthContext);
  const { startLoading, stopLoading } = useContext(LoadingContext)!;
  const navigate = useNavigate();

  if (auth && auth.loading) {
    return null;
  }

  const handleLogout = async () => {
    startLoading();
    try {
      await userService.signOut();
      auth?.setIsAuth(false);
      navigate('/');
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  return (
    <nav className="container-nav">
      <div className="navigation">
        <div className="main-nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
            to="/"
          >
            Home
          </NavLink>
        </div>
        {auth?.isAuth ? (
          <div className="group-nav">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <button className="nav-item btn-logout" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="group-nav">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
              to="/sign-in"
            >
              Sign In
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};
