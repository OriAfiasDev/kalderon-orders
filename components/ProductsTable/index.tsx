import React, { memo, useEffect, useState } from 'react';
import { Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react';
import { IContact, IProduct } from '@types';
import { SortableTd } from './SortableTd';
import { TableInput } from './TableInput';
import { TableActions } from './TableActions';
import { sortFunc } from './utils';

interface ProductTableProps {
  products: IProduct[];
  contact: IContact;
}

export type SortKey = 'category' | 'product_name' | 'current_quantity' | 'order_quantity';

export const ProductsTable: React.FC<ProductTableProps> = ({ products, contact }) => {
  const [updatedProducts, setUpdatedProducts] = useState<IProduct[]>(products);
  const [sortKey, setSortKey] = useState<SortKey>('category');

  useEffect(() => {
    setUpdatedProducts(products);
  }, [products]);

  const handleProductUpdate = (productId: string, field: keyof IProduct, value: any) => {
    setUpdatedProducts(prev => prev.map(p => (p.product_id === productId ? { ...p, [field]: value } : p)));
  };

  return (
    <>
      <TableContainer overflowY='auto' maxHeight='60vh'>
        <Table dir='rtl' align='center' justifyContent='center' size='sm'>
          <Thead position='sticky' top={0}>
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
            {updatedProducts
              .sort((a, b) => sortFunc(a, b, sortKey))
              .map(product => (
                <Tr key={product.product_id}>
                  <Td maxWidth={['60px', 'unset']} overflow='hidden' title={product.category.category_name}>
                    <Text textOverflow='ellipsis' overflow='hidden'>
                      {product.category.category_name}
                    </Text>
                  </Td>
                  <Td maxWidth={['60px', 'unset']} overflow='hidden' title={product.product_name}>
                    <Text textOverflow='ellipsis' overflow='hidden'>
                      {product.product_name}
                    </Text>
                  </Td>
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
      {contact && <TableActions contact={contact} updatedProducts={updatedProducts} setUpdatedProducts={setUpdatedProducts} />}
    </>
  );
};
