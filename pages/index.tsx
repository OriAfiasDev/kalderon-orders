import { Box, Heading, Container, Text, Stack } from '@chakra-ui/react';
import { DrawerExample } from '@components/Drawer';
import { TodayOrders } from '@components/TodayOrders';
import { ICompanySmall } from '@types';
import { NextPage } from 'next';

interface HomeProps {
  todayOrders: ICompanySmall[];
}

const Home: NextPage<HomeProps> = ({ todayOrders }) => (
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
        <DrawerExample companyNames={[]} />
      </Stack>
    </Stack>
  </Container>
);

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://127.0.0.1:3000/api/today`);
  const props = await res.json();

  return { props };
}

export default Home;
