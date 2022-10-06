import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Button, Center, Divider, Stack, useToast } from '@chakra-ui/react';
import { IContact, IProduct } from '@types';
import { getWhatsappLink } from './utils';
import { updateQuantities } from '@utils/api';

interface TableActionsProps {
  updatedProducts: IProduct[];
  setUpdatedProducts: Dispatch<SetStateAction<IProduct[]>>;
  contact: IContact;
}

export const TableActions: React.FC<TableActionsProps> = ({ updatedProducts, contact, setUpdatedProducts }) => {
  const toast = useToast();

  const canOrder = useMemo(() => updatedProducts.some(product => product.order_quantity > 0), [updatedProducts]);
  const canSave = useMemo(() => updatedProducts.some(product => product.current_quantity > 0), [updatedProducts]);
  const canClearOrder = useMemo(() => updatedProducts.some(product => product.order_quantity > 0), [updatedProducts]);
  const canClearInventory = useMemo(() => updatedProducts.some(product => product.current_quantity > 0), [updatedProducts]);

  const sendOrder = useCallback(async () => {
    const success = await updateQuantities(updatedProducts, 'order');
    if (!success) return toast({ title: 'לא הצלחנו לשמור את ההזמנה, אנא נסה שנית', status: 'error', duration: 9000, isClosable: true });

    window.open(getWhatsappLink(contact, updatedProducts), '_ blank');
  }, [updatedProducts, contact, toast]);

  const clear = useCallback(
    async (key: 'current_quantity' | 'order_quantity') => {
      const clearedQuantities = updatedProducts.map(p => ({ ...p, [key]: 0 }));
      setUpdatedProducts(clearedQuantities);
      const success = await updateQuantities(clearedQuantities, key === 'current_quantity' ? 'current' : 'order');
      toast({
        title: success ? 'כמויות נוקו בהצלחה' : 'לא הצלחנו לנקות את הכמויות, אנא נסה שנית',
        status: success ? 'success' : 'error',
        duration: 9000,
        isClosable: true,
      });
    },
    [updatedProducts, setUpdatedProducts, toast]
  );

  return (
    <Stack>
      <Center mt='4'>
        <Button colorScheme='green' onClick={() => updateQuantities(updatedProducts)} disabled={!canSave}>
          שמור מלאי
        </Button>
        <Divider orientation='vertical' w='3' />
        <Button colorScheme='green' onClick={sendOrder} disabled={!canOrder}>
          שלח הזמנה
        </Button>
      </Center>
      <Center>
        <Button colorScheme='cyan' variant='ghost' size='sm' onClick={() => clear('current_quantity')} disabled={!canClearInventory}>
          אפס מלאי
        </Button>
        <Button colorScheme='cyan' variant='ghost' size='sm' onClick={() => clear('order_quantity')} disabled={!canClearOrder}>
          אפס הזמנה
        </Button>
      </Center>
    </Stack>
  );
};
