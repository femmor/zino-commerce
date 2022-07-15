import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

import headerStyles from '../components/header/Header.module.scss';

export const logo = (
  <div className={headerStyles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

export const activeLink = ({ isActive }) =>
  isActive ? `${headerStyles.active}` : '';

export const cart = (
  <span className={headerStyles.cart}>
    <NavLink className={activeLink} to="/cart">
      Cart <FaShoppingCart size={20} />
      <p>0</p>
    </NavLink>
  </span>
);
