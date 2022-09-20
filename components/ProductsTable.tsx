import { Button, Center, Input, Table, Tbody, Td, Tfoot, Thead, Tr } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { IProduct } from '../types';

interface ProductTableProps {
  products: IProduct[];
}

export const ProductsTable: React.FC<ProductTableProps> = ({ products }) => {
  const router = useRouter();
  const [updatedProducts, setUpdatedProducts] = React.useState<IProduct[]>(products);
  const canOrder = useMemo(() => updatedProducts.some(product => product.order_quantity > 0), [updatedProducts]);

  const handleProductUpdate = (productId: string, field: keyof IProduct, value: any) => {
    setUpdatedProducts(prev => prev.map(p => (p.product_id === productId ? { ...p, [field]: value } : p)));
  };

  const sendOrder = useCallback(() => {
    const text = updatedProducts
      .filter(p => p.order_quantity > 0)
      .map(p => `${p.product_name} - ${p.order_quantity}`)
      .join('%0a');
    router.push(`https://wa.me/972542533533?text=${text}`, '_blank');
  }, [updatedProducts, router]);

  return (
    <>
      <Table dir='rtl' align='center' justifyContent='center'>
        <Thead>
          <Tr>
            <Td>קטגוריה</Td>
            <Td>שם מוצר</Td>
            <Td>מלאי</Td>
            <Td>הזמנה</Td>
          </Tr>
        </Thead>
        <Tbody>
          {updatedProducts.map(product => (
            <Tr key={product.product_id}>
              <Td>{product.category.category_name}</Td>
              <Td>{product.product_name}</Td>
              <Td>
                <Input
                  width='20'
                  type='number'
                  value={product.current_quantity}
                  onChange={e => handleProductUpdate(product.product_id, 'current_quantity', Number(e.target.value))}
                />
              </Td>
              <Td>
                <Input
                  width='20'
                  type='number'
                  value={product.order_quantity}
                  onChange={e => handleProductUpdate(product.product_id, 'order_quantity', Number(e.target.value))}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Center>
        <Button color='teal.400' onClick={sendOrder} disabled={!canOrder}>
          שלח הזמנה
        </Button>
      </Center>
    </>
  );
};