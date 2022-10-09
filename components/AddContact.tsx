import { Button, Container, Input, useToast } from '@chakra-ui/react';
import { createContact } from '@utils/api';
import { useCallback, useState } from 'react';
import { useRefresh } from './hooks/useRefresh';

interface AddContactProps {
  company_id: string;
}

export const AddContact: React.FC<AddContactProps> = ({ company_id }) => {
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const refresh = useRefresh();
  const toast = useToast();

  const handleAdd = useCallback(async () => {
    const success = await createContact(contactName, contactPhone, company_id);

    toast({
      title: success ? 'איש קשר נוסף בהצלחה' : 'איש קשר לא נוסף',
      status: success ? 'success' : 'error',
      isClosable: true,
      duration: 9000,
    });

    setContactName('');
    setContactPhone('');
    refresh();
  }, [contactName, contactPhone, company_id, refresh, toast]);

  return (
    <Container my='2' dir='rtl'>
      <Input mb='1' placeholder='שם איש קשר' value={contactName} onChange={e => setContactName(e.target.value)} />
      <Input mb='1' placeholder='טלפון' value={contactPhone} onChange={e => setContactPhone(e.target.value)} />

      <Button onClick={handleAdd} w='100%' colorScheme='green'>
        הוסף איש קשר
      </Button>
    </Container>
  );
};
