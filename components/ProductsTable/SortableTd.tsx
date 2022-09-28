import { Td } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { SortKey } from '.';

interface SortableTdProps extends PropsWithChildren {
  isActiveSort: boolean;
  setActiveSort: () => void;
}

export const SortableTd: React.FC<SortableTdProps> = ({ isActiveSort, setActiveSort, children }) => (
  <Td cursor='pointer' color={isActiveSort ? 'cyan.500' : 'blackAlpha.500'} onClick={setActiveSort}>
    {children}
  </Td>
);
