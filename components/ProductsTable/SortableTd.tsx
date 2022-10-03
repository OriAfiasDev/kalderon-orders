import { Td } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface SortableTdProps extends PropsWithChildren {
  isActiveSort: boolean;
  setActiveSort: () => void;
}

export const SortableTd: React.FC<SortableTdProps> = ({ isActiveSort, setActiveSort, children }) => (
  <Td
    cursor='pointer'
    fontWeight={isActiveSort ? 'extrabold' : 'normal'}
    color={isActiveSort ? 'cyan.500' : undefined}
    onClick={setActiveSort}>
    {children}
  </Td>
);
