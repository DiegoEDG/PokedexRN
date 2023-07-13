import {useEffect, useState} from 'react';

export const useDebouncer = (searchTerm = '', time = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  return debouncedValue;
};
