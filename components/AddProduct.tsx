import { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Container, Heading, Input, Select } from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { ICategory } from '@types';

interface AddProductProps {
  company_id: string;
  categories: { [category_id: string]: ICategory };
}

export const AddProduct: React.FC<AddProductProps> = ({ company_id, categories }) => {
  const [productName, setProductName] = useState<string>('');
  const [productCategoryId, setProductCategoryId] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);

  const handleAdd = useCallback(async () => {
    const product = {
      product_id: uuid(),
      product_name: productName,
      category_id: productCategoryId,
      current_quantity: 0,
      order_quantity: 0,
      product_price: productPrice,
      company_id: company_id,
    };

    await supabase.from('products').insert(product);
  }, [productCategoryId, productName, productPrice, company_id]);

  return (
    <Container my='2' dir='rtl'>
      <Heading fontSize='larger' mb='2'>הוסף פריט</Heading>
      <Input mb='1' placeholder='שם מוצר' value={productName} onChange={e => setProductName(e.target.value)} />
      <Input mb='1' placeholder='מחיר' value={productPrice} onChange={e => setProductPrice(Number(e.target.value))} />
      <Select mb='1' placeholder='בחר קטגוריה' value={productCategoryId} onChange={e => setProductCategoryId(e.target.value)}>
        {Object.keys(categories).map(c => (
          <option key={categories[c].category_id} value={categories[c].category_id}>
            {categories[c].category_name}
          </option>
        ))}
      </Select>
      <Button onClick={handleAdd} w='100%'>הוסף מוצר</Button>
    </Container>
  );
};
