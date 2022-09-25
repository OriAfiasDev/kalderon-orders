import { ICompanySmall } from '@types';
import { convertNumToDay } from '@utils/conversions';
import { useMemo } from 'react';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { CheckCircleIcon } from '@chakra-ui/icons';

interface TodayOrdersProps {
  todayOrders: ICompanySmall[];
}

export const TodayOrders: React.FC<TodayOrdersProps> = ({ todayOrders }) => {
  const today = useMemo(() => convertNumToDay(new Date().getDay()), []);
  const text = useMemo(() => (todayOrders.length ? 'אתה צריך לעשות הזמנה לחברות הבאות:' : 'אין לך הזמנות'), [todayOrders.length]);

  return (
    <Box textAlign='center' py={10} px={6}>
      {todayOrders.length ? (
        <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
      ) : (
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      )}

      <Heading as='h2' size='xl' mt={6} mb={2}>
        היום יום {today}
      </Heading>

      <Text color={'gray.500'}>{text}</Text>
      {todayOrders.map(({company_name, company_id}) => (
        <Link href={`/companies/${company_name}`} key={company_id}>{company_name}</Link>
      ))}
    </Box>
  );
};
