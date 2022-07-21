import { useSelector } from 'react-redux';
import styles from './Navbar.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { selectUserName } from '../../../store/features/authSlice';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const username = useSelector(selectUserName);

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#eee" />
        <h4>{username}</h4>
      </div>
      <nav className="">
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/view-products" className={activeLink}>
              View Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
