import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Container, Heading, Input, Select } from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { ICategory } from '@types';

interface AddProductProps {
  company_id: string;
  categories: ICategory[];
}

export const AddProduct: React.FC<AddProductProps> = ({ company_id, categories }) => {
  const [productName, setProductName] = useState<string>('');
  const [productCategoryId, setProductCategoryId] = useState<string>(categories[0].category_id);
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
    <Container mt='10' dir='rtl'>
      <Heading fontSize='larger'>הוסף פריט</Heading>
      <Input placeholder='שם מוצר' value={productName} onChange={e => setProductName(e.target.value)} />
      <Input placeholder='מחיר' value={productPrice} onChange={e => setProductPrice(Number(e.target.value))} />
      <Select placeholder='בחר קטגוריה' value={productCategoryId} onChange={e => setProductCategoryId(e.target.value)}>
        {categories.map(c => (
          <option key={c.category_id} value={c.category_id}>
            {c.category_name}
          </option>
        ))}
      </Select>
      <Button onClick={handleAdd}>הוסף מוצר</Button>
    </Container>
  );
};
