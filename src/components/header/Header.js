import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { FaTimes } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { logo, cart, activeLink } from '../../helpers/headerHelpers';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('User logged out successfully.');
        navigate('/');
      })
      .catch(error => {
        toast.error('Error: ' + error.message);
      });
  };

  return (
    <>
      <header className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                : `${styles['nav-wrapper']}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink className={activeLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={activeLink} to="/contact">
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink className={activeLink} to="/login">
                Login
              </NavLink>
              <NavLink className={activeLink} to="/register">
                Register
              </NavLink>
              <NavLink className={activeLink} to="/order-history">
                My Orders
              </NavLink>
              <NavLink onClick={logoutUser} to="/">
                Log Out
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles['menu-icon']}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </header>
    </>
  );
};
export default Header;
