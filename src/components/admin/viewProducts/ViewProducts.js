import { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  orderBy,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db, storage } from '../../../firebase/config';
import styles from './ViewProducts.module.scss';
import Loader from '../../../components/loader/Loader';
import { toast } from 'react-toastify';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, snapshot => {
        const allProducts = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setProducts(allProducts);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id, imageURL) => {
    try {
      // Delete product
      await deleteDoc(doc(db, 'products', id));

      // Delete product image
      const imageRef = ref(storage, imageURL);
      await deleteObject(imageRef);

      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        {products.length === 0 ? (
          <p>No product found...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {products.map((product, i) => {
              const { id, name, price, imageURL, category } = product;
              return (
                <tbody key={id}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{
                          width: '100px',
                        }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>${price}</td>
                    <td className={styles.icons}>
                      <Link to="/admin/add-product">
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={19}
                        color="red"
                        onClick={() => deleteProduct(id, imageURL)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};
export default ViewProducts;
