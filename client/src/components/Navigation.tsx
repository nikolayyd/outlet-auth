import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export const Navigation = () => {
  const auth = useContext(AuthContext);

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
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
              onClick={() => {
                auth.setIsAuth(false);
              }}
              to="/sign-out"
            >
              Sign Out
            </NavLink>
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
