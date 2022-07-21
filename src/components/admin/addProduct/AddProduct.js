import { useState } from 'react';
import Card from '../../../components/card/Card';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { toast } from 'react-toastify';

import styles from './AddProduct.module.scss';

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

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: '',
    imageURL: '',
    price: null,
    category: '',
    brand: '',
    description: '',
  });

  const [uploadProgress, setUploadProgress] = useState(0);

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
          toast.success('Image uploaded successfully');
        });
      }
    );
  };

  const addProduct = e => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card className={styles.card}>
        <form onSubmit={addProduct}>
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
            placeholder="Add a product description"
            onChange={e => handleInputChange(e)}
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit" className="--btn --btn-primary">
            Add Product
          </button>
        </form>
      </Card>
    </div>
  );
};
export default AddProducts;
