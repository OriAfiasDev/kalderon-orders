import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Divider,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Input,
  List,
  ListItem,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ICompanySmall } from '@types';
import { AddCompany } from './AddCompany';
import axios from 'axios';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

export const Drawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = React.useState('');
  const [companies, setCompanies] = useState<ICompanySmall[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${window.location.origin}/api/companies/`);
      setCompanies(data);
    })();
  }, []);

  const filteredCompanies = useMemo(() => companies.filter(company => company.company_name.includes(search)), [companies, search]);

  const onClick = (route: string) => {
    router.push(route);
    onClose();
  };

  return (
    <>
      <HamburgerIcon cursor='pointer' fontSize='3xl' m='2' onClick={onOpen} />
      <ChakraDrawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent dir='rtl'>
          <DrawerBody>
            <NextLink href='/'>
              <Button onClick={onClose} variant='ghost' w='100%'>
                דף הבית
              </Button>
            </NextLink>
            <Input placeholder='חפש חברה' mb='2' value={search} onChange={e => setSearch(e.target.value)} size='sm' />
            <List spacing={3}>
              {filteredCompanies.map(company => (
                <ListItem key={company.company_id}>
                  <div onClick={() => onClick(`/companies/${company.company_name_english}`)}>{company.company_name}</div>
                </ListItem>
              ))}
            </List>
          </DrawerBody>

          <Divider h='3' />
          <AddCompany />
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};
