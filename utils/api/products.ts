import { IProduct, IProductAPI } from '@types';
import { supabase } from '@utils/supabaseClient';
import { v4 as uuid } from 'uuid';

export const createProduct = async (
  product_name: string,
  product_price: number,
  category_id: string,
  company_id: string
): Promise<boolean> => {
  if (!product_name || !product_price || !category_id || !company_id) return false;
  try {
    const product: IProductAPI = {
      product_name,
      product_price,
      product_id: uuid(),
      category_id,
      company_id,
      current_quantity: 0,
      order_quantity: 0,
    };
    const { status } = await supabase.from('products').insert(product);
    return status < 300;
  } catch {
    return false;
  }
};

export const updateQuantities = async (products: IProduct[], type: 'order' | 'current' = 'current'): Promise<boolean> => {
  if (!products.length) return false;

  try {
    const productsToUpdate = products.map(({ product_id, current_quantity, order_quantity }) =>
      type === 'order' ? { product_id, order_quantity } : { product_id, current_quantity }
    );

    const { status, statusText } = await supabase.from('products').upsert(productsToUpdate, { onConflict: 'product_id' });
    return status < 300;
  } catch {
    return false;
  }
};
