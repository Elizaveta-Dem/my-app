import { Cart } from "../types/cart";
import { Category } from "../types/category"
import { Product } from "../types/product"

const BASE = 'http://localhost:7777/api'

export async function fetchCategory(): Promise<Category[]> {
    const res = await fetch(`${BASE}/category`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include'
    });
    if (!res.ok) throw new Error('Ошибка загрузки категорий');
    return res.json();
}

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(`${BASE}/product`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include'
    });
    if (!res.ok) throw new Error('Error fetching products');
    return res.json();
}

export async function fetchCart(): Promise<Cart[]> {
    const res = await fetch(`${BASE}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Error fetching cart');
    return res.json();
  }

export async function fetchProductById(productId: number): Promise<Product> {
    const res = await fetch(`${BASE}/product/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Error fetching product');
    return res.json();
}


