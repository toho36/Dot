import { useCallback, useEffect, useState } from 'react';
import { ColumnVisibility } from '../Types/types';


export const useColumnVisibility = (): [ColumnVisibility, (columnName: string) => void] => {
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(() => {
    const storedVisibility = localStorage.getItem('columnVisibility');
    const defaultVisibility: ColumnVisibility = {
      name: true,
      archived: true,
      createdAt: true,
      icon: true,
      itemsCount: true,
      lastImport: true,
    };
    return storedVisibility ? JSON.parse(storedVisibility) : defaultVisibility;
  });

  const toggleColumnVisibility = useCallback((columnName: string) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  }, [columnVisibility]);

  useEffect(() => {
    localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  return [columnVisibility, toggleColumnVisibility];
};

