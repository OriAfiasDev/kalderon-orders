import React, { useMemo } from 'react';
import { Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Input, List, ListItem, useDisclosure } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ICompanySmall } from '@types';
import { AddCompany } from './AddCompany';

interface DrawerProps {
  allCompanies: ICompanySmall[];
}

export const DrawerExample: React.FC<DrawerProps> = ({ allCompanies }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = React.useState('');
  const filteredCompanies = useMemo(() => allCompanies.filter(company => company.company_name.includes(search)), [allCompanies, search]);

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme={'green'}
        bg={'green.400'}
        rounded={'full'}
        px={6}
        _hover={{
          bg: 'green.500',
        }}>
        פתח תפריט
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent dir='rtl'>
          <DrawerBody>
            <Input placeholder='חפש חברה' value={search} onChange={e => setSearch(e.target.value)} size='sm' />
            <List spacing={3}>
              {filteredCompanies.map(company => (
                <ListItem key={company.company_id}>
                  <NextLink href={`/companies/${company.company_name_english}`}>{company.company_name}</NextLink>
                </ListItem>
              ))}
            </List>
          </DrawerBody>

          <Divider h='3' />
          <AddCompany />
        </DrawerContent>
      </Drawer>
    </>
  );
};
