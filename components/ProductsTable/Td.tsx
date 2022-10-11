import { ComponentWithAs, TableCellProps, Td as ChakraTd } from '@chakra-ui/react';

export const Td: ComponentWithAs<'td', TableCellProps> = ({ children, ...rest }) => (
  <ChakraTd borderBottom='0' {...rest}>
    {children}
  </ChakraTd>
);
