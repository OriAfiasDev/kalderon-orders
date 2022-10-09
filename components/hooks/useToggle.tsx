import { useCallback, useState } from 'react';

const useToggle = (defaultValue: boolean) => {
  const [state, setState] = useState<boolean>(defaultValue);

  const toggleState = useCallback(() => setState(prev => !prev), []);

  return [state, toggleState] as const;
};

export default useToggle;
