import { useCallback, useState } from 'react';
import { Button, Container, Heading, Input, useToast } from '@chakra-ui/react';
import { createCategory } from '@utils/api';

interface AddCategoryProps {
  company_id: string;
}

export const AddCategory: React.FC<AddCategoryProps> = ({ company_id }) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const toast = useToast();

  const handleAdd = useCallback(async () => {
    const success = await createCategory(categoryName, company_id);
    toast({
      title: success ? 'קטגוריה נוספה בהצלחה' : 'לא הצלחנו להוסיף קטגוריה, אנא נסה שנית',
      status: success ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
    });

    setCategoryName('');
  }, [categoryName, company_id, toast]);

  return (
    <Container my='2' dir='rtl'>
      <Heading fontSize='larger' mb='2'>
        הוסף קטגוריה
      </Heading>
      <Input mb='1' placeholder='שם קטגוריה' value={categoryName} onChange={e => setCategoryName(e.target.value)} />

      <Button onClick={handleAdd} w='100%' colorScheme='green'>
        הוסף קטגוריה
      </Button>
    </Container>
  );
};
