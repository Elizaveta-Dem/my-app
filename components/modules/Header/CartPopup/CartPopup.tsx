'use client';
import { withClickOutside } from "../../../hocs/withClickOutside";
import { IWrappedComponentProps } from "../../../../types/hocs";
import { forwardRef, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../../../../hooks/useLang";
import { useCart } from "../../../../hooks/useCart";
import { fetchProductById } from '../../../../services/fetch';
import { Product } from "../../../../types/product";
import { updateQuantity } from "../../../../hooks/updateCart";

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
    ({ open, setOpen }, ref) => {
      const { lang, translations } = useLang();
      const { data: cartData, isLoading, refetch } = useCart();
      const [products, setProducts] = useState<Record<number, Product>>({});
      const [totalPrice, setTotalPrice] = useState(0);
  
      useEffect(() => {
        if (cartData) {
          const fetchProducts = async () => {
            const productPromises = cartData.map((cartItem) => fetchProductById(cartItem.productid));
            const productResults = await Promise.all(productPromises);
            const productsById = productResults.reduce((acc, product) => {
              acc[product.id] = product;
              return acc;
            }, {} as Record<number, Product>);
            setProducts(productsById);
          };
  
          fetchProducts();
        }
      }, [cartData]);
  
      useEffect(() => {
        let sum = 0;
        for (const cart of cartData || []) {
          sum += parseFloat(cart.prices) * cart.quantity;
        }
        setTotalPrice(sum);
      }, [cartData]);
  
      const handleShowPopup = () => setOpen(true);
      const handleHidePopup = () => setOpen(false);
  
      const handleUpdateQuantity = async (id: number, quantity: number) => {
        try {
          await updateQuantity(id, quantity);
          refetch();
        } catch (error) {
          console.error('Error updating quantity:', error);
        }
      };
  
      return (
        <div className="cart-popup" ref={ref}>
          <Link
            className="header__links__item__btn header__links__item__btn--cart"
            href="/cart"
            onMouseEnter={handleShowPopup}
          />
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="cart-popup__wrapper"
                onMouseLeave={handleHidePopup}
              >
                <span className="cart-popup__arrow" />
                <button
                  className="btn-reset cart-popup__close"
                  onClick={handleHidePopup}
                />
                <h3 className="cart-popup__title">
                  {translations[lang].breadcrumbs.cart}
                </h3>
                <ul className="list-reset cart-popup__cart-list">
                  {isLoading ? (
                    <li className="cart-popup__cart-list__loading">
                      Загрузка...
                    </li>
                  ) : !cartData || cartData.length === 0 ? (
                    <li className="cart-popup__cart-list__empty">
                      Корзина пуста
                    </li>
                  ) : (
                    cartData.map((cart) => {
                      const product = products[cart.productid];
                      return (
                        <li key={`${cart.id}-${cart.quantity}`} className="cart-popup__cart-list__item">
                          <div>{product ? product.name : 'Загрузка...'}</div>
                          <div>{cart.quantity} x {parseFloat(cart.prices)} ₽</div>
                          <button onClick={() => handleUpdateQuantity(cart.id, cart.quantity + 1)}>
                            +
                          </button>
                          <button onClick={() => handleUpdateQuantity(cart.id, cart.quantity - 1)}>
                            -
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>
                <div className="cart-popup__footer">
                  <div className="cart-popup__footer__inner">
                    <span>{translations[lang].common.order_price}:</span>
                    <span>{totalPrice} ₽</span>
                  </div>
                  <Link href="/order" className="cart-popup__footer__link">
                    {translations[lang].breadcrumbs.order}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
  );
  
  CartPopup.displayName = "CartPopup";
  
  export default withClickOutside(CartPopup);