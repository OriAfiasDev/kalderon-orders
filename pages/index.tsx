import { Box, Heading, Container, Text, Stack } from '@chakra-ui/react';
import { DrawerExample } from '@components/Drawer';
import { TodayOrders } from '@components/TodayOrders';
import { ICompany, ICompanySmall } from '@types';
import { NextPage } from 'next';

interface HomeProps {
  todayOrders: ICompanySmall[];
  companyNames: string[];
}

const Home: NextPage<HomeProps> = ({ todayOrders, companyNames }) => (
  <Container maxW={'3xl'}>
    <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
      <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
        Kalderon
        <br />
        <Text as={'span'} color={'green.400'}>
          Bar Manager
        </Text>
      </Heading>
      <TodayOrders todayOrders={todayOrders} />
      <Stack direction={'column'} spacing={3} align={'center'} alignSelf={'center'} position={'relative'}>
        <DrawerExample companyNames={companyNames} />
      </Stack>
    </Stack>
  </Container>
);

export async function getServerSideProps() {
  const today = await fetch(`http://127.0.0.1:3000/api/today`);
  const todayOrders = await today.json();

  const allCompanies = await fetch(`http://127.0.0.1:3000/api/companies`);
  const companyNames = (await allCompanies.json()).map((c: ICompany) => c.company_name);

  const props = { ...todayOrders, companyNames };

  return { props };
}

export default Home;
