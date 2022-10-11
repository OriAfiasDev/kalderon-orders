import { CloseIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, Heading, SlideFade, ThemeTypings } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import useToggle from './hooks/useToggle';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { getRandomColor } from '@utils/conversions';

interface CardProps extends PropsWithChildren {
  borderColor?: ThemeTypings['colors'];
  isOpenDefault?: boolean;
  title: string;
}

export const Card: React.FC<CardProps> = ({ borderColor = getRandomColor(), isOpenDefault = false, title, children }) => {
  const [isOpen, toggleIsOpen] = useToggle(isOpenDefault);

  return (
    <Box shadow='xl' borderRadius='8' borderTop='3px solid' borderColor={borderColor} mb='6' p='2' bgColor='whiteAlpha.200'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading fontSize='lg' mb='2'>
          {title}
        </Heading>
        <ChevronDownIcon transform={`rotate(${isOpen ? '180' : '0'}deg)`} onClick={toggleIsOpen} transition='all 0.2s ease-in-out' />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    </Box>
  );
};
