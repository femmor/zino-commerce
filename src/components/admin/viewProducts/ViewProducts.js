import { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../../firebase/config';
import styles from './ViewProducts.module.scss';
import Loader from '../../../components/loader/Loader';
import { toast } from 'react-toastify';

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

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.products}></div>
    </>
  );
};
export default ViewProducts;
