import { Input } from '@chakra-ui/react';

interface TableInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const TableInput: React.FC<TableInputProps> = ({ value, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return <Input size='sm' variant='filled' width='12' height='6' textAlign='right' type='number' value={value} onChange={handleChange} />;
};
