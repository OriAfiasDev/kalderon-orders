import { IContact, IProduct } from '@types';
import { SortKey } from '.';

export const sortFunc = (a: IProduct, b: IProduct, sortKey: SortKey): number => {
  if (sortKey === 'category') {
    return b.category.category_name.localeCompare(a.category.category_name);
  }

  if (sortKey === 'product_name') {
    return b[sortKey].localeCompare(a[sortKey]);
  }

  return b[sortKey] - a[sortKey];
};

export const getWhatsappLink = (contact: IContact, products: IProduct[]) => {
    const productsString = products
      .filter(p => p.order_quantity > 0)
      .map(p => `${p.product_name} - ${p.order_quantity}`)
      .join('%0a');
  
    return `https://wa.me/${contact.contact_phone}?text=${productsString}`;
  };