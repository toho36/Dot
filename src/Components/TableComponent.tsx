import { useQuery } from '@apollo/client';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useColumnVisibility } from '../Hooks/useColumnVisibility';
import { useHandleArchivedChange, useHandleNameChange } from '../Hooks/useDataHandlers';
import { DataSource } from '../Types/types';
import { GET_DATA_SOURCES } from '../Utils/graphqlQueries';
import ColumnVisibilitySelector from './ColumnVisibilitySelector';
import TableCellContent from './TableCellContent';

const TableComponent: React.FC = () => {
  const { loading, error, data } = useQuery(GET_DATA_SOURCES);
  const { collection: { dataSources = [] } = {} } = data || {};
  const [columnVisibility, toggleColumnVisibility] = useColumnVisibility();


  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log('GraphQL data new:', data);

  return (
    <div>
      <ColumnVisibilitySelector columnVisibility={columnVisibility} toggleColumnVisibility={toggleColumnVisibility} />
      <Table>
        <TableHead  >
          <TableRow>
            {Object.keys(columnVisibility).map(
              (columnName) =>
                columnVisibility[columnName] && <TableCell key={columnName} style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'center',
                }}>{columnName}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody >
          {dataSources.map((dataSource: DataSource) => (
            <TableRow key={dataSource.id} >
              {Object.keys(columnVisibility).map((columnName) => (
                columnVisibility[columnName] && (
                  <TableCell key={`${columnName}-${dataSource.id}`} style={{
                    border: '1px solid black',
                    padding: '8px',
                    textAlign: 'center',
                  }} >
                    <TableCellContent
                      columnName={columnName}
                      dataSource={dataSource}
                    />
                  </TableCell>
                )
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;