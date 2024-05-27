import { Cart } from '../types/cart';

export async function addToCart(

  productid: number,
  quantity: number,
  prices: number,
  totalPrice: number,
  createdAt: Date
): Promise<Cart> {
  const userid = 1;
  const cartData: Omit<Cart, 'id'> = {
    userid,
    productid,
    quantity,
    prices,
    totalPrice,
    createdAt,
  };

  try {
    const response = await fetch('http://localhost:7777/api/cart', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}