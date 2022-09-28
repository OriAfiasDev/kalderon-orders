import { ICompanySmall } from '@types';
import { convertNumToDay } from '@utils/conversions';
import { useMemo } from 'react';
import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
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
      <Heading as='h2' size='xl'>
        היום יום {today}
      </Heading>

      {todayOrders.length ? (
        <WarningTwoIcon boxSize={'50px'} color={'orange.300'} my={4} />
      ) : (
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} my={4} />
      )}

      <Text fontSize='lg' color={'gray.500'} mb='2'>{text}</Text>
      <Stack>
        {todayOrders.map(({ company_name, company_id, company_name_english }) => (
          <Link href={`/companies/${company_name_english}`} key={company_id}>
            {company_name}
          </Link>
        ))}
      </Stack>
    </Box>
  );
};
