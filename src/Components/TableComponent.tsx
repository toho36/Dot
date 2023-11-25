import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Input, Select, MenuItem,Checkbox } from '@mui/material';
import DUMMY_DATA from '../DummyData/data';

interface DataSource {
  name: string;
  archived: boolean;
  createdAt: string;
  icon: string;
  itemsCount: number;
  lastImport: string;
  [key: string]: string | boolean | number; // Index signature for dynamic keys
}

interface ColumnVisibility {
  [key: string]: boolean;
}

const TableComponent: React.FC = () => {
    const initialColumnVisibility: ColumnVisibility = Object.keys(DUMMY_DATA.data.collection.dataSources[0]).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
    
      const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(() => {
        // Retrieve column visibility from localStorage on component mount
        const storedVisibility = localStorage.getItem('columnVisibility');
        return storedVisibility ? JSON.parse(storedVisibility) : initialColumnVisibility;
      });
    
      const [data, setData] = useState<DataSource[]>(DUMMY_DATA.data.collection.dataSources);
    
      const toggleColumnVisibility = (columnName: string) => {
        setColumnVisibility((prevVisibility) => {
          const newVisibility = { ...prevVisibility, [columnName]: !prevVisibility[columnName] };
          // Save column visibility to localStorage
          localStorage.setItem('columnVisibility', JSON.stringify(newVisibility));
          return newVisibility;
        });
      };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the "lastImport" values every minute for demonstration purposes
      setData((prevData) =>
        prevData.map((item) => ({ ...item, lastImport: new Date().toISOString() }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []); // Run once on component mount

  const timeDifference = (timestamp: string): string => {
    const currentTimestamp = new Date().getTime();
    const lastImportTimestamp = new Date(timestamp).getTime();
    const difference = currentTimestamp - lastImportTimestamp;
    const minutes = Math.floor(difference / 60000); // Convert milliseconds to minutes

    return `${minutes} minutes ago`;
  };

  const handleArchivedChange = (index: number, newValue: boolean) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], archived: newValue };
      return newData;
    });
  };

  const handleItemsCountChange = (index: number, newCount: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], itemsCount: newCount };
      return newData;
    });
  };

  return (
    <div>
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
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(columnVisibility).map(
              (columnName) =>
                columnVisibility[columnName] && <TableCell key={columnName}>{columnName}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dataSource: DataSource, index) => (
            <TableRow key={dataSource.name}>
              {Object.keys(columnVisibility).map((columnName) => (
                columnVisibility[columnName] && (
                  <TableCell key={columnName}>
                    {columnName === 'lastImport'
                      ? timeDifference(dataSource[columnName].toString())
                      : columnName === 'createdAt'
                      ? new Date(dataSource[columnName].toString()).toLocaleDateString('en-GB')
                      : columnName === 'archived'
                      ? (
                          <Select
                            value={dataSource[columnName]}
                            onChange={(e) => handleArchivedChange(index, e.target.value === 'true')}
                            displayEmpty
                            variant="standard"
                            sx={{
                              border: 'none',
                              padding: '0',
                              '&:focus': {
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            <MenuItem value="" disabled>
                              {dataSource[columnName].toString()}
                            </MenuItem>
                            <MenuItem value={'true'}>true</MenuItem>
                            <MenuItem value={'false'}>false</MenuItem>
                          </Select>
                        )
                      : columnName === 'itemsCount'
                      ? (
                          <Input
                            type="number"
                            value={dataSource[columnName]}
                            onChange={(e) => handleItemsCountChange(index, +e.target.value)}
                          />
                        )
                      : dataSource[columnName]}
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
