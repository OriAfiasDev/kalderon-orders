import { useMemo } from 'react';
import { Container, Divider, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { ProductsTable } from '@components/ProductsTable';
import { AddProduct } from '@components/AddProduct';
import { ICategory, ICompany } from '@types';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { AddContact } from '@components/AddContact';
import { AddCategory } from '@components/AddCategory';
import { arrayToMap } from '@utils/conversions';
import { supabase } from '@utils/supabaseClient';
import { getCompanyByEnglishName } from '@utils/api';

const Company: React.FC<ICompany> = ({ products, categories, company_name, contacts, company_id }) => {
  const categoriesMap = useMemo(() => arrayToMap(categories, 'category_id'), [categories]);

  console.log({ products });
  return (
    <Container>
      <Heading textAlign='center' color='teal.500'>
        {company_name}
      </Heading>

      <Tabs isFitted variant='enclosed' dir='rtl' mt='2'>
        <TabList mb='1em'>
          <Tab>הזמנה</Tab>
          <Tab>סוכנים</Tab>
          <Tab>עריכה</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProductsTable products={products} contact={contacts[0]} />
          </TabPanel>
          <TabPanel>
            {contacts.map(contact => (
              <Text textAlign='center' fontSize='xl' key={contact.contact_id}>
                סוכן: {contact.contact_name} - {contact.contact_phone}
              </Text>
            ))}
          </TabPanel>
          <TabPanel>
            <AddContact company_id={company_id} />
            <Divider />
            <AddCategory company_id={company_id} />
            <Divider />
            <AddProduct company_id={company_id} categoriesMap={categoriesMap} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const company_name = context.params?.company_name as string;

  const props = getCompanyByEnglishName(company_name);

  return { props };
};

export default Company;
