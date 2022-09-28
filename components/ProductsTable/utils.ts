import { IProduct } from '@types';
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
