import { Input } from '@chakra-ui/react';

interface TableInputProps {
    value: number;
    onChange: (value: number) => void;
}

export const TableInput: React.FC<TableInputProps> = ({ value, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return <Input size='sm' width='10' variant='flushed' type='number' focusBorderColor='cyan.500' value={value} onChange={handleChange} />;
};
