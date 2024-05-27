'use client';
import React, { useEffect, useState } from 'react';
import ProductsListItem from '../../modules/ProductsListItem/ProductsListItem';
import styles from './catalog.module.scss';
import { Product } from '../../../types/product';
import { fetchProducts } from '../../../services/fetch';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchFirstCategoryProducts();
  }, []);

  const fetchFirstCategoryProducts = async () => {
    try {
      const products = await fetchProducts();
      const firstCategoryId = products[0]?.categoryId;
      const filteredProducts = products.filter(product => product.categoryId === firstCategoryId);
      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      setError('Ошибка загрузки продуктов');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки продуктов</div>;
  }

  const groupedProducts = [];
  for (let i = 0; i < products.length; i += 4) {
    groupedProducts.push(products.slice(i, i + 4));
  }

  return (
    <div className={styles.catalog}>
      <h1>Каталог\Электрические гитары</h1>
      <div className={styles.productsList}>
        {groupedProducts.map((group, index) => (
          <div key={index} className={styles.productRow}>
            {group.map(product => (
              <ProductsListItem key={product.id} product={product} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;