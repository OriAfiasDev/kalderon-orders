import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Container, Heading, Text } from '@chakra-ui/react';
import { ProductsTable } from '@components/ProductsTable';
import { AddProduct } from '@components/AddProduct';
import { supabase } from '@utils/supabaseClient';
import { ICompany } from '@types';

const Company: React.FC<ICompany> = props => {
  const categories = useMemo(() => props.products.map(p => p.category), [props.products]);
  console.log(props);
  // console.log(uuid());

  return (
    <Container>
      <Heading textAlign='center' color='teal.500'>
        {props.company_name}
      </Heading>
      {props.contacts.map(contact => (
        <Text textAlign='center' fontSize='xl' key={contact.contact_id}>
          סוכן: {contact.contact_name} - {contact.contact_phone}
        </Text>
      ))}

      <ProductsTable products={props.products} />

      <AddProduct company_id={props.company_id} categories={categories} />
    </Container>
  );
};

export async function getServerSideProps(context: any) {
  const { company_name } = context.params;

  const data = await supabase
    .from('companies')
    .select(
      `*,products: products!company_id(product_id,product_name,product_price,order_quantity,current_quantity,category: category_id(*)),contacts: contacts!company_id(contact_id, contact_name, contact_phone)`
    )
    .match({ company_name })
    .single();

  return {
    props: data.data,
  };
}

export default Company;
