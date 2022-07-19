import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { logo, cart, activeLink } from '../../helpers/headerHelpers';
import { toast } from 'react-toastify';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER } from '../../store/features/authSlice';

const Header = () => {
  const [displayName, setDisplayName] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  // Auth state change - monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(
      auth,
      user => {
        if (user) {
          if (user.displayName === null) {
            // get username from email
            const username = user.email.split('@')[0];
            // convert the first char in username to uppercase
            const newUsername =
              username.charAt(0).toUpperCase() + username.slice(1);
            setDisplayName(newUsername);
          } else {
            setDisplayName(user.displayName);
          }

          dispatch(
            SET_ACTIVE_USER({
              email: user.email,
              userName: user.displayName ? user.displayName : displayName,
              userId: user.uid,
            })
          );
        } else {
          setDisplayName('');
        }
      },
      []
    );
  });

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
              {displayName ? (
                <>
                  <Link to="#">
                    <FaUserCircle size={16} /> Hi!, {displayName}
                  </Link>
                </>
              ) : (
                <>
                  <NavLink className={activeLink} to="/login">
                    Login
                  </NavLink>
                  <NavLink className={activeLink} to="/register">
                    Register
                  </NavLink>
                </>
              )}
              <NavLink className={activeLink} to="/order-history">
                My Orders
              </NavLink>
              {displayName && (
                <NavLink onClick={logoutUser} to="/">
                  Log Out
                </NavLink>
              )}
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
