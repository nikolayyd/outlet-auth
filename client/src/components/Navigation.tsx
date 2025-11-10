import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';
export const Navigation = () => {
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
        <div className="auth-nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
            to="/sign-in"
          >
            Sign In
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
            to="/sign-up"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
