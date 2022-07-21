import { useState } from 'react';
import Card from '../../../components/card/Card';

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

  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = e => {
    setProduct({
      ...product,
      imageURL: e.target.files[0],
    });
  };

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card className={styles.card}>
        <form>
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
              <div
                className={styles['progress-bar']}
                style={{
                  width: '50%',
                }}
              >
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={e => handleImageChange(e)}
              placeholder="Product image"
            />
            <input
              type="text"
              name="imageUrl"
              value={product.imageURL}
              required
              disabled
            />
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
