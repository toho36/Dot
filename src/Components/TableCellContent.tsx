import { Input, MenuItem, Select } from '@mui/material';
import React from 'react';
import { getTimeDifference } from '../Utils/getTimeDifference';
interface Props {
  columnName: string;
  dataSource: any;
  inputValues: { [id: number]: string };
  handleNameChange: (id: number, newName: string) => void;
  handleArchivedChange: (id: number, newArchivedValue: boolean) => void;
}
const TableCellContent: React.FC<Props> = ({
  columnName,
  dataSource,
  inputValues,
  handleNameChange,
  handleArchivedChange,
}) => {

  if (columnName === 'name') {
    return (
      <Input
        style={{ width: '200px' }}
        value={inputValues[dataSource.id] || dataSource.name}
        onChange={(e) => handleNameChange(dataSource.id, e.target.value)}
      />
    );
  } else if (columnName === 'archived') {
    return (
      <Select

        value={dataSource[columnName]}
        onChange={(e) => handleArchivedChange(dataSource.id, e.target.value === 'true')}
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Select >
    );
  } else if (columnName === 'createdAt') {
    return new Date(dataSource[columnName]?.toString());
  } else if (columnName === 'lastImport') {
    return getTimeDifference(dataSource[columnName]?.toString());
  } else {
    return dataSource[columnName];
  }
};

export default TableCellContent;
