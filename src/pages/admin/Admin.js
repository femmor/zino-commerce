import styles from './Admin.module.scss';
import { Route, Routes } from 'react-router-dom';
import {
  Home,
  AddProduct,
  Orders,
  ViewProducts,
  Navbar,
} from '../../components/admin';

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="view-products" element={<ViewProducts />} />
        </Routes>
      </div>
    </div>
  );
};
export default Admin;
