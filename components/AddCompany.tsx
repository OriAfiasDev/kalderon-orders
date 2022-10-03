import { Button, Divider, DrawerFooter, Input, Select } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { convertDayToNum, days, hebToEnglish } from '@utils/conversions';
import { v4 as uuid } from 'uuid';
import { useToast } from '@chakra-ui/react';
import { useRefresh } from './hooks/useRefresh';

export const AddCompany: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const toast = useToast();
  const refresh = useRefresh();

  const onPreferredDaysChanged = useCallback((preferredDay: string) => {
    setPreferredDays(preferredDays =>
      preferredDays.includes(preferredDay) ? preferredDays.filter(d => d !== preferredDay) : [...preferredDays, preferredDay]
    );
  }, []);

  const onCancel = useCallback(() => {
    setCompanyName('');
    setPreferredDays([]);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      await axios.post(`${window.location.origin}/api/companies/`, {
        company_name: companyName,
        preferred_days: preferredDays.map(day => convertDayToNum(day)),
        company_name_english: hebToEnglish(companyName),
        company_id: uuid(),
      });

      setCompanyName('');
      setPreferredDays([]);
      refresh();
      toast({
        title: 'החברה נוספה בהצלחה',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'החברה לא נוספה',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [companyName, preferredDays, toast, refresh]);

  return (
    <>
      <DrawerFooter flexDirection='column'>
        <Input placeholder='הוסף חברה' value={companyName} onChange={e => setCompanyName(e.target.value)} size='sm' />
        <Select placeholder='בחר יום מועדף' value={preferredDays} onChange={e => onPreferredDaysChanged(e.target.value)} size='sm'>
          {days.long.map(day => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </DrawerFooter>
      <DrawerFooter>
        <Button variant='outline' mr={3} onClick={onCancel}>
          ביטול
        </Button>
        <Divider orientation='vertical' w='3' />
        <Button colorScheme='green' onClick={onSubmit}>
          הוסף חברה
        </Button>
      </DrawerFooter>
    </>
  );
};
