import { Checkbox } from '@mui/material';
import React from 'react';

export interface Props {
  columnVisibility: { [key: string]: boolean };
  toggleColumnVisibility: (columnName: string) => void;
}
const ColumnVisibilitySelector: React.FC<Props> = ({ columnVisibility, toggleColumnVisibility }) => {
  return (
    <div>
      {Object.keys(columnVisibility).map((columnName) => (
        <div key={columnName}>
          <Checkbox
            checked={columnVisibility[columnName]}
            onChange={() => toggleColumnVisibility(columnName)}
          />
          {columnName}
        </div>
      ))}
    </div>
  );
};

export default ColumnVisibilitySelector;
