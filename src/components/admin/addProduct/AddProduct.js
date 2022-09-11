import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../store/features/productSlice';
import Card from '../../../components/card/Card';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';

import styles from './AddProduct.module.scss';
import { addDoc, setDoc, collection, Timestamp, doc } from 'firebase/firestore';

const categories = [
  {
    id: 1,
    name: 'Laptop',
  },
  {
    id: 2,
    name: 'Electronics',
  },
  {
    id: 3,
    name: 'Fashion',
  },
  {
    id: 4,
    name: 'Phones',
  },
];

const initialState = {
  name: '',
  imageURL: '',
  price: null,
  category: '',
  brand: '',
  description: '',
};

const AddProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Detect if the user is editing a product or adding a new product
  const detectForm = (id, arg1, arg2) => {
    if (id === 'ADD') {
      return arg1;
    } else {
      return arg2;
    }
  };

  const products = useSelector(selectProducts);
  const productEdit = products.find(item => item.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    const storageRef = ref(
      storage,
      `zcommerce-uploads/${Date.now()}${file.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      error => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then(downloadURL => {
          setProduct({
            ...product,
            imageURL: downloadURL,
          });
          toast.success(
            `Image ${detectForm(id, 'uploaded', 'edited')} successfully`
          );
        });
      }
    );
  };

  const addProduct = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        createdAt: Timestamp.now().toDate(),
      });
      toast.success('Product added successfully');
      setProduct({ ...initialState });
      setUploadProgress(0);
      setIsLoading(false);
      navigate('/admin/view-products');
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const editProduct = async e => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      // Delete previous product image
      const previousImageRef = ref(storage, productEdit.imageURL);
      deleteObject(previousImageRef);
    }

    try {
      await setDoc(doc(db, 'products', id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success('Product edited successfully!');
      navigate('/admin/view-products');
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, 'Add New Product', 'Edit Product')}</h2>
        <Card className={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={e => handleInputChange(e)}
              placeholder="Product name"
              required
            />

            <label htmlFor="productImage">Product Image:</label>
            <Card className={styles.group}>
              <div className={styles.progress}>
                {uploadProgress !== 0 && (
                  <div
                    className={styles['progress-bar']}
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  >
                    {uploadProgress < 100
                      ? `Uploading... ${uploadProgress}%`
                      : `Upload complete - ${uploadProgress}%`}
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={e => handleImageChange(e)}
                placeholder="Product image"
              />
              {product.imageURL && (
                <input
                  type="text"
                  name="imageUrl"
                  value={product.imageURL}
                  required
                  disabled
                />
              )}
            </Card>
            <label htmlFor="price">Product Price:</label>
            <input
              type="number"
              name="price"
              value={product.price === null ? 0 : product.price}
              onChange={e => handleInputChange(e)}
              placeholder="Product price"
              required
            />
            <label htmlFor="category">Product Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={e => handleInputChange(e)}
            >
              <option value="" disabled>
                -- Select Category --
              </option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="company">Product Company/Brand:</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={e => handleInputChange(e)}
              placeholder="Product Company/Brand"
              required
            />
            <label htmlFor="description">Product Description</label>
            <textarea
              name="description"
              value={product.description}
              placeholder={`${detectForm(
                id,
                'Add a',
                'Edit'
              )} product description`}
              onChange={e => handleInputChange(e)}
              cols="30"
              rows="10"
              required
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              {detectForm(id, 'Add Product', 'Edit Product')}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};
export default AddProducts;
