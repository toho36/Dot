import { Input, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useHandleArchivedChange, useHandleNameChange } from '../Hooks/useDataHandlers';
import { DataSource } from '../Types/types';
import { getTimeDifference } from '../Utils/getTimeDifference';
interface Props {
  columnName: string;
  dataSource: DataSource;

}
const TableCellContent: React.FC<Props> = ({
  columnName,
  dataSource,
}) => {
  const { nameValue, handleNameChange } = useHandleNameChange(dataSource.id, dataSource.name);
  const handleArchivedChange = useHandleArchivedChange();

  if (columnName === 'name') {
    return (
      <Input
        style={{ width: '200px' }}
        value={nameValue}
        onChange={(e) => handleNameChange(e.target.value)}
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
    return new Date(dataSource[columnName]).toLocaleDateString();

  } else if (columnName === 'lastImport') {
    return getTimeDifference(dataSource[columnName]?.toString());
  } else {
    return dataSource[columnName];
  }
};

export default TableCellContent;
