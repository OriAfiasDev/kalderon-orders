import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, Center, Divider } from '@chakra-ui/react';
import { IContact, IProduct } from '@types';
import { getWhatsappLink } from './utils';

interface TableActionsProps {
  updatedProducts: IProduct[];
  setUpdatedProducts: Dispatch<SetStateAction<IProduct[]>>;
  contact: IContact;
}

export const TableActions: React.FC<TableActionsProps> = ({ updatedProducts, contact, setUpdatedProducts }) => {
  const canOrder = useMemo(() => updatedProducts.some(product => product.order_quantity > 0), [updatedProducts]);
  const canSave = useMemo(() => updatedProducts.some(product => product.current_quantity > 0), [updatedProducts]);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window?.location.origin);
  }, []);

  const updateQuantities = useCallback(
    async (products: IProduct[], type: 'order' | 'current' = 'current') => {
      await axios.post(`${origin}/api/products/quantities/${type}`, { products });
    },
    [origin]
  );

  const sendOrder = useCallback(() => {
    updateQuantities(updatedProducts, 'order');
    window.open(getWhatsappLink(contact, updatedProducts), '_ blank');
  }, [updatedProducts, contact, updateQuantities]);

  const clear = useCallback(
    (key: 'current_quantity' | 'order_quantity') => {
      const clearedQuantities = updatedProducts.map(p => ({ ...p, [key]: 0 }));
      setUpdatedProducts(clearedQuantities);
      updateQuantities(clearedQuantities, key === 'current_quantity' ? 'current' : 'order');
    },
    [updatedProducts, setUpdatedProducts, updateQuantities]
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
