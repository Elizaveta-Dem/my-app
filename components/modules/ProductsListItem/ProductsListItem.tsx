import React, { useState } from 'react';
import { IProductsListItemProps } from '../../../types/modules';
import styles from "../ProductsListItem/index.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '../../../hooks/useLang';
import { addToCart } from '../../../hooks/addToCart';
import { useCart } from '../../../hooks/useCart';

const ProductsListItem = ({ product }: IProductsListItemProps) => {
  const { lang, translations } = useLang();
  const [notification, setNotification] = useState(false);
  const { refetch } = useCart(); 

  const handleAddToCart = async () => {
    try {
      const priceAsNumber = parseFloat(product.prices); 
      if (isNaN(priceAsNumber)) {
        throw new Error("Invalid price format");
      }
      await addToCart(product.id, 1, priceAsNumber, priceAsNumber, new Date());
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
        refetch(); 
      }, 2000);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <li className={styles.list__item}>
      <Link
        href={`/catalog/${product.categoryId}/${product.id}`}
        className={styles.list__item__img}
      >
        <Image 
          src={`/img/guitars/${product.image}`} 
          alt={product.name} 
          layout="fill"
          objectFit='contain' 
        />
      </Link>
      <div className={styles.list__item__inner}>
        <h3 className={styles.list__item__title}>
          <Link href={`/catalog/${product.categoryId}/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <span className={styles.list__item__price}>
          {product.prices} ₽
        </span>
      </div>
      <button
        className={`btn-reset ${styles.list__item__cart}`}
        onClick={handleAddToCart}
      >
        {translations[lang].product.to_cart}
      </button>
      {notification && (
        <div className={styles.notification}>
          {translations[lang].product.to_cart}
        </div>
      )}
    </li>
  );
};

export default ProductsListItem;
