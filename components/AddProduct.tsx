import { useCallback, useState } from 'react';
import { Button, Container, Input, Select, useToast } from '@chakra-ui/react';
import { ICategory } from '@types';
import { useRefresh } from './hooks/useRefresh';
import { createProduct } from '@utils/api';

interface AddProductProps {
  company_id: string;
  categoriesMap: { [category_id: string]: ICategory };
}

export const AddProduct: React.FC<AddProductProps> = ({ company_id, categoriesMap }) => {
  const [productName, setProductName] = useState<string>('');
  const [productCategoryId, setProductCategoryId] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const refresh = useRefresh();
  const toast = useToast();

  const handleAdd = useCallback(async () => {
    const success = await createProduct(productName, +productPrice, productCategoryId, company_id);

    toast({
      title: success ? 'מוצר נוסף בהצלחה' : 'מוצר לא נוסף',
      status: success ? 'success' : 'error',
      isClosable: true,
      duration: 9000,
    });

    setProductName('');
    setProductPrice('');
    refresh();
  }, [productCategoryId, productName, productPrice, company_id, refresh, toast]);

  return (
    <Container my='2' dir='rtl'>
      <Input mb='1' placeholder='שם מוצר' value={productName} onChange={e => setProductName(e.target.value)} />
      <Input mb='1' placeholder='מחיר' type='number' value={productPrice} onChange={e => setProductPrice(e.target.value)} />
      <Select
        variant='flushed'
        mb='1'
        placeholder='בחר קטגוריה'
        value={productCategoryId}
        onChange={e => setProductCategoryId(e.target.value)}>
        {Object.keys(categoriesMap).map(c => (
          <option key={categoriesMap[c].category_id} value={categoriesMap[c].category_id}>
            {categoriesMap[c].category_name}
          </option>
        ))}
      </Select>
      <Button onClick={handleAdd} w='100%' colorScheme='green'>
        הוסף מוצר
      </Button>
    </Container>
  );
};
