import { Box, Heading, Container, Text, Stack } from '@chakra-ui/react';
import { DrawerExample } from '@components/Drawer';
import { TodayOrders } from '@components/TodayOrders';
import { ICompany, ICompanySmall } from '@types';
import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';

interface HomeProps {
  todayOrders: ICompanySmall[];
  allCompanies: ICompanySmall[];
}

const Home: NextPage<HomeProps> = ({ todayOrders, allCompanies }) => (
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
        <DrawerExample allCompanies={allCompanies} />
      </Stack>
    </Stack>
  </Container>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const { host } = context.req.headers;
  const newHost = host?.includes('http') ? host : `http://${host}`;
  const { data: todayOrders } = await axios.get(`${newHost}/api/today`);

  const { data: allCompanies } = await axios.get(`${newHost}/api/companies`);

  const props = { ...todayOrders, allCompanies };

  return { props };
};

export default Home;
