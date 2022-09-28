import React, { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, Center, Divider, Input, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { IContact, IProduct } from '@types';

interface ProductTableProps {
  products: IProduct[];
  contact: IContact;
}

const updateQuantities = async (products: IProduct[], type: 'order' | 'current' = 'current') => {
  const res = await axios.post(`${window.location.origin}/api/products/quantities/${type}`, {
    method: 'POST',
    body: JSON.stringify({ products }),
  });
  console.log(res);
};

const getWhatsappLink = (contact: IContact, products: IProduct[]) => {
  const productsString = products
    .filter(p => p.order_quantity > 0)
    .map(p => `${p.product_name} - ${p.order_quantity}`)
    .join('%0a');

  return `https://wa.me/${contact.contact_phone}?text=${productsString}`;
};

type SortKey = 'category' | 'product_name' | 'current_quantity' | 'order_quantity';

export const ProductsTable: React.FC<ProductTableProps> = ({ products, contact }) => {
  const [updatedProducts, setUpdatedProducts] = useState<IProduct[]>(products);
  const [sortKey, setSortKey] = useState<SortKey>('category');
  const canOrder = useMemo(() => updatedProducts.some(product => product.order_quantity > 0), [updatedProducts]);
  const canSave = useMemo(() => updatedProducts.some(product => product.current_quantity > 0), [updatedProducts]);

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

  const sendOrder = useCallback(() => {
    updateQuantities(updatedProducts, 'order');
    window.open(getWhatsappLink(contact, updatedProducts), '_ blank');
  }, [updatedProducts, contact]);

  const clearQuantities = useCallback(() => {
    const emptyQuantities = updatedProducts.map(p => ({ ...p, current_quantity: 0 }));
    setUpdatedProducts(emptyQuantities);
    updateQuantities(emptyQuantities);
  }, [updatedProducts]);

  const clearOrder = useCallback(() => {
    const emptyQuantities = updatedProducts.map(p => ({ ...p, order_quantity: 0 }));
    setUpdatedProducts(emptyQuantities);
    updateQuantities(emptyQuantities, 'order');
  }, [updatedProducts]);

  return (
    <>
      <TableContainer>
        <Table dir='rtl' align='center' justifyContent='center' size='sm'>
          <Thead>
            <Tr>
              <Td cursor='pointer' color={sortKey === 'category' ? 'cyan.500' : 'blackAlpha.500'} onClick={() => setSortKey('category')}>
                קטגוריה
              </Td>
              <Td
                cursor='pointer'
                color={sortKey === 'product_name' ? 'cyan.500' : 'blackAlpha.500'}
                onClick={() => setSortKey('product_name')}>
                שם מוצר
              </Td>
              <Td
                cursor='pointer'
                color={sortKey === 'current_quantity' ? 'cyan.500' : 'blackAlpha.500'}
                onClick={() => setSortKey('current_quantity')}>
                מלאי
              </Td>
              <Td
                cursor='pointer'
                color={sortKey === 'order_quantity' ? 'cyan.500' : 'blackAlpha.500'}
                onClick={() => setSortKey('order_quantity')}>
                הזמנה
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {updatedProducts.sort(sortFunc).map(product => (
              <Tr key={product.product_id}>
                <Td>{product.category.category_name}</Td>
                <Td>{product.product_name}</Td>
                <Td>
                  <Input
                    size='sm'
                    width='10'
                    variant='flushed'
                    type='number'
                    focusBorderColor='cyan.500'
                    value={product.current_quantity}
                    onChange={e => handleProductUpdate(product.product_id, 'current_quantity', Number(e.target.value))}
                  />
                </Td>
                <Td>
                  <Input
                    size='sm'
                    width='10'
                    variant='flushed'
                    type='number'
                    focusBorderColor='cyan.500'
                    value={product.order_quantity}
                    onChange={e => handleProductUpdate(product.product_id, 'order_quantity', Number(e.target.value))}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Center>
        <Button onClick={() => updateQuantities(updatedProducts)} disabled={!canSave}>
          שמור מלאי
        </Button>
        <Divider orientation='vertical' />
        <Button onClick={sendOrder} disabled={!canOrder}>
          שלח הזמנה ל{contact.contact_name}
        </Button>
      </Center>
      <Divider my='3' />
      <Center>
        <Button variant='ghost' size='sm' onClick={clearQuantities} disabled={!canSave}>
          אפס מלאי
        </Button>
        <Button variant='ghost' size='sm' onClick={clearOrder} disabled={!canSave}>
          אפס הזמנה
        </Button>
      </Center>
    </>
  );
};
