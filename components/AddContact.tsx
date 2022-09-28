import { Button, Container, Heading, Input } from '@chakra-ui/react';
import { IContact } from '@types';
import { supabase } from '@utils/supabaseClient';
import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface AddContactProps {
  company_id: string;
}

export const AddContact: React.FC<AddContactProps> = ({ company_id }) => {
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');

  const handleAdd = useCallback(async () => {
    const contact: IContact = {
      contact_id: uuid(),
      contact_name: contactName,
      contact_phone: contactPhone,
      company_id,
    };

    await supabase.from('contacts').insert(contact);
  }, [contactName, contactPhone, company_id]);

  return (
    <Container my='2' dir='rtl'>
      <Heading fontSize='larger' mb='2'>
        הוסף איש קשר
      </Heading>
      <Input mb='1' placeholder='שם איש קשר' value={contactName} onChange={e => setContactName(e.target.value)} />
      <Input mb='1' placeholder='טלפון' value={contactPhone} onChange={e => setContactPhone(e.target.value)} />

      <Button onClick={handleAdd} w='100%'>
        הוסף איש קשר
      </Button>
    </Container>
  );
};
