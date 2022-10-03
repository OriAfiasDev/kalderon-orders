import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Container, Heading, Input } from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { ICategory } from '@types';

interface AddCategoryProps {
  company_id: string;
}

export const AddCategory: React.FC<AddCategoryProps> = ({ company_id }) => {
  const [categoryName, setCategoryName] = useState<string>('');

  const handleAdd = useCallback(async () => {
    const product: ICategory = {
      category_id: uuid(),
      category_name: categoryName,
      company_id,
    };

    await supabase.from('categories').insert(product);
    setCategoryName('');
  }, [categoryName, company_id]);

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
