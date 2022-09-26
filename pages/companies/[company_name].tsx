import { useMemo } from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';
import { ProductsTable } from '@components/ProductsTable';
import { AddProduct } from '@components/AddProduct';
import { ICategory, ICompany } from '@types';

const Company: React.FC<ICompany> = props => {
  const categories = useMemo(() => {
    const categories: { [c_id: string]: ICategory } = {};

    props.products.forEach(p => {
      categories[p.category.category_id] = p.category;
    });
    return categories;
  }, [props.products]);

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

      <ProductsTable products={props.products} contact={props.contacts[0]} />

      <AddProduct company_id={props.company_id} categories={categories} />
    </Container>
  );
};

export async function getServerSideProps(context: any) {
  const { company_name } = context.params;

  const res = await fetch(`https://kalderon-orders.vercel.app/api/companies/${company_name}`);
  const props = await res.json();

  return { props };
}

export default Company;
