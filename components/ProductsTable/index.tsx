import React, { useState } from 'react';
import { Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { IContact, IProduct } from '@types';
import { SortableTd } from './SortableTd';
import { TableInput } from './TableInput';
import { TableActions } from './TableActions';

interface ProductTableProps {
  products: IProduct[];
  contact: IContact;
}

export type SortKey = 'category' | 'product_name' | 'current_quantity' | 'order_quantity';

export const ProductsTable: React.FC<ProductTableProps> = ({ products, contact }) => {
  const [updatedProducts, setUpdatedProducts] = useState<IProduct[]>(products);
  const [sortKey, setSortKey] = useState<SortKey>('category');

  const sortFunc = (a: IProduct, b: IProduct): number => {
    if (sortKey === 'category') {
      return b.category.category_name.localeCompare(a.category.category_name);
    }

    if (sortKey === 'product_name') {
      return b[sortKey].localeCompare(a[sortKey]);
    }

    return b[sortKey] - a[sortKey];
  };

  const handleProductUpdate = (productId: string, field: keyof IProduct, value: any) => {
    setUpdatedProducts(prev => prev.map(p => (p.product_id === productId ? { ...p, [field]: value } : p)));
  };

  return (
    <>
      <TableContainer>
        <Table dir='rtl' align='center' justifyContent='center' size='sm'>
          <Thead>
            <Tr>
              <SortableTd isActiveSort={sortKey === 'category'} setActiveSort={() => setSortKey('category')}>
                קטגוריה
              </SortableTd>
              <SortableTd isActiveSort={sortKey === 'product_name'} setActiveSort={() => setSortKey('product_name')}>
                שם מוצר
              </SortableTd>
              <SortableTd isActiveSort={sortKey === 'current_quantity'} setActiveSort={() => setSortKey('current_quantity')}>
                מלאי
              </SortableTd>
              <SortableTd isActiveSort={sortKey === 'order_quantity'} setActiveSort={() => setSortKey('order_quantity')}>
                הזמנה
              </SortableTd>
            </Tr>
          </Thead>
          <Tbody>
            {updatedProducts.sort(sortFunc).map(product => (
              <Tr key={product.product_id}>
                <Td>{product.category.category_name}</Td>
                <Td>{product.product_name}</Td>
                <Td>
                  <TableInput
                    value={product.current_quantity}
                    onChange={val => handleProductUpdate(product.product_id, 'current_quantity', val)}
                  />
                </Td>
                <Td>
                  <TableInput
                    value={product.order_quantity}
                    onChange={val => handleProductUpdate(product.product_id, 'order_quantity', Number(val))}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <TableActions contact={contact} updatedProducts={updatedProducts} setUpdatedProducts={setUpdatedProducts} />
    </>
  );
};
