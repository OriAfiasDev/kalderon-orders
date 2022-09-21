import React, { useMemo } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Input,
  Link,
  List,
  ListIcon,
  ListItem,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface DrawerProps {
  companyNames: string[];
}

export const DrawerExample: React.FC<DrawerProps> = ({ companyNames }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = React.useState('');
  const filteredCompanies = useMemo(() => companyNames.filter(company => company.includes(search)), [companyNames, search]);

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        Open
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent dir='rtl'>
          <DrawerBody>
            <Input placeholder='חפש חברה' value={search} onChange={e => setSearch(e.target.value)} size='sm' />
            <List spacing={3}>
              {filteredCompanies.map(name => (
                <ListItem key={name}>
                  <NextLink href={`/companies/${name}`}>{name}</NextLink>
                </ListItem>
              ))}
            </List>
          </DrawerBody>

          <Divider h='3' />
          {/* TODO: add company logic */}
          <DrawerFooter>
            <Input placeholder='הוסף חברה' value={search} onChange={e => setSearch(e.target.value)} size='sm' />
          </DrawerFooter>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              ביטול
            </Button>
            <Divider orientation='vertical' w='3' />
            <Button colorScheme='blue'>הוסף חברה</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
