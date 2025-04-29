
import { Product } from '@/types';

const API_URL = 'https://fakestoreapi.com';

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch product with id: ${id}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
