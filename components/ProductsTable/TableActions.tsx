import { Button, Center, Divider } from '@chakra-ui/react';
import { IContact, IProduct } from '@types';
import axios from 'axios';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

interface TableActionsProps {
  updatedProducts: IProduct[];
  setUpdatedProducts: Dispatch<SetStateAction<IProduct[]>>;
  contact: IContact;
}

const getWhatsappLink = (contact: IContact, products: IProduct[]) => {
  const productsString = products
    .filter(p => p.order_quantity > 0)
    .map(p => `${p.product_name} - ${p.order_quantity}`)
    .join('%0a');

  return `https://wa.me/${contact.contact_phone}?text=${productsString}`;
};

const updateQuantities = async (products: IProduct[], type: 'order' | 'current' = 'current') => {
  const res = await axios.post(`${window.location.origin}/api/products/quantities/${type}`, {
    method: 'POST',
    body: JSON.stringify({ products }),
  });
  console.log(res);
};

export const TableActions: React.FC<TableActionsProps> = ({ updatedProducts, contact, setUpdatedProducts }) => {
  const canOrder = useMemo(() => updatedProducts.some(product => product.order_quantity > 0), [updatedProducts]);
  const canSave = useMemo(() => updatedProducts.some(product => product.current_quantity > 0), [updatedProducts]);

  const sendOrder = useCallback(() => {
    updateQuantities(updatedProducts, 'order');
    window.open(getWhatsappLink(contact, updatedProducts), '_ blank');
  }, [updatedProducts, contact]);

  const clear = useCallback(
    (key: 'current_quantity' | 'order_quantity') => {
      const claredQuantities = updatedProducts.map(p => ({ ...p, [key]: 0 }));
      setUpdatedProducts(claredQuantities);
      updateQuantities(claredQuantities, key === 'current_quantity' ? 'current' : 'order');
    },
    [updatedProducts, setUpdatedProducts]
  );

  return (
    <>
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
        <Button variant='ghost' size='sm' onClick={() => clear('current_quantity')} disabled={!canSave}>
          אפס מלאי
        </Button>
        <Button variant='ghost' size='sm' onClick={() => clear('order_quantity')} disabled={!canSave}>
          אפס הזמנה
        </Button>
      </Center>
    </>
  );
};
