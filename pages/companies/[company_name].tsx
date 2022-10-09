import { useMemo } from 'react';
import { Box, Container, Divider, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { ProductsTable } from '@components/ProductsTable';
import { AddProduct } from '@components/AddProduct';
import { ICompany } from '@types';
import { GetServerSideProps } from 'next';
import { AddContact } from '@components/AddContact';
import { AddCategory } from '@components/AddCategory';
import { arrayToMap } from '@utils/conversions';
import { getCompanyByEnglishName } from '@utils/api';
import { Card } from '@components/Card';

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
              <Card isOpenDefault title={contact.contact_name} key={contact.contact_id}>
                <Text fontSize='lg'>{contact.contact_phone}</Text>
              </Card>
            ))}
          </TabPanel>
          <TabPanel>
            <Card borderColor='blue.500' title='הוסף איש קשר'>
              <AddContact company_id={company_id} />
            </Card>
            <Card borderColor='orange.500' title='הוסף קטגוריה'>
              <AddCategory company_id={company_id} />
            </Card>
            <Card borderColor='purple.500' title='הוסף פריט'>
              <AddProduct company_id={company_id} categoriesMap={categoriesMap} />
            </Card>
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
