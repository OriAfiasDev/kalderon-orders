import React, { useCallback, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import { Button, Center, Divider, Input, Table, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { IContact, IProduct } from '@types';

interface ProductTableProps {
  products: IProduct[];
  contact: IContact;
}

const updateQuantities = async (products: IProduct[], type: 'order' | 'current' = 'current') => {
  const res = await fetch(`http://127.0.0.1:3000/api/products/quantities/${type}`, {
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

export const ProductsTable: React.FC<ProductTableProps> = ({ products, contact }) => {
  const router = useRouter();
  const [updatedProducts, setUpdatedProducts] = React.useState<IProduct[]>(products);
  const canOrder = useMemo(() => updatedProducts.some(product => product.order_quantity > 0), [updatedProducts]);
  const canSave = useMemo(() => updatedProducts.some(product => product.current_quantity > 0), [updatedProducts]);

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
