import { Flex, Link } from '@chakra-ui/react';

interface NavItemProps {
  href: string;
  text: string;
}

export const NavItem: React.FC<NavItemProps> = ({ href, text }) => (
  <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
    <Flex
      align='center'
      p='2'
      borderRadius='lg'
      role='group'
      cursor='pointer'
      _hover={{
        bg: 'teal.400',
        color: 'white',
      }}>
      {text}
    </Flex>
  </Link>
);
