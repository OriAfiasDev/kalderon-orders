import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Divider,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Input,
  List,
  ListItem,
  Switch,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ICompanySmall } from '@types';
import { AddCompany } from './AddCompany';
import axios from 'axios';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { getCompanies } from '@utils/api';

export const Drawer: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = React.useState('');
  const [companies, setCompanies] = useState<ICompanySmall[]>([]);
  const router = useRouter();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    getCompanies().then(setCompanies);
  }, []);

  const filteredCompanies = useMemo(() => companies.filter(company => company.company_name.includes(search)), [companies, search]);

  const onCompanyClicked = useCallback(
    (route: string) => {
      router.push(route);
      onClose();
    },
    [onClose, router]
  );

  return (
    <>
      <Flex direction='row' justifyContent='space-between' alignItems='center' px='4'>
        <HamburgerIcon cursor='pointer' fontSize='3xl' m='2' onClick={onOpen} />
        <Switch colorScheme='teal' onChange={toggleColorMode} />
      </Flex>

      <ChakraDrawer initialFocusRef={undefined} isOpen={isOpen} placement={isMobile ? 'bottom' : 'right'} onClose={onClose}>
        <DrawerOverlay backdropFilter='blur(2px)' bgColor='transparent' />
        <DrawerContent dir='rtl' borderTop={isMobile ? '4px solid teal' : ''} borderRadius={isMobile ? 10 : 0}>
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
                  <div onClick={() => onCompanyClicked(`/companies/${company.company_name_english}`)}>{company.company_name}</div>
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
