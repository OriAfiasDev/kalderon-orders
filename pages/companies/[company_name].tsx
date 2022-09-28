import { useMemo } from 'react';
import { Container, Divider, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { ProductsTable } from '@components/ProductsTable';
import { AddProduct } from '@components/AddProduct';
import { ICategory, ICompany } from '@types';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { AddContact } from '@components/AddContact';
import { AddCategory } from '@components/ProductsTable/AddCategory';
import { arrayToMap } from '@utils/conversions';

const Company: React.FC<ICompany> = props => {
  const categoriesMap = useMemo(() => arrayToMap(props.categories, 'category_id'), [props.categories]);

  return (
    <Container>
      <Heading textAlign='center' color='teal.500'>
        {props.company_name}
      </Heading>

      <Tabs isFitted variant='enclosed' dir='rtl' mt='2'>
        <TabList mb='1em'>
          <Tab>הזמנה</Tab>
          <Tab>סוכנים</Tab>
          <Tab>עריכה</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProductsTable products={props.products} contact={props.contacts[0]} />
          </TabPanel>
          <TabPanel>
            {props.contacts.map(contact => (
              <Text textAlign='center' fontSize='xl' key={contact.contact_id}>
                סוכן: {contact.contact_name} - {contact.contact_phone}
              </Text>
            ))}
          </TabPanel>
          <TabPanel>
            <AddContact company_id={props.company_id} />
            <Divider />
            <AddCategory company_id={props.company_id} />
            <Divider />
            <AddProduct company_id={props.company_id} categoriesMap={categoriesMap} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const company_name = context.params?.company_name as string;
  const { host } = context.req.headers;
  const newHost = host?.includes('http') ? host : `http://${host}`;

  const { data: props } = await axios.get(`${newHost}/api/companies/${company_name}`);

  return { props };
};

export default Company;
