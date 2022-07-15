import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { logo, cart, activeLink } from '../../helpers/headerHelpers';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className={styles.header}>
      {logo}
      <nav
        className={showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`}
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
          </span>
          {cart}
        </div>
      </nav>

      <div className={styles['menu-icon']}>
        {cart}
        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
      </div>
    </header>
  );
};
export default Header;
