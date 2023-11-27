import { gql, useQuery } from '@apollo/client';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';



interface DataSource {
  id: number;
  name: string;
  archived: boolean;
  createdAt: string;
  icon: string;
  itemsCount: number;
  lastImport: string;
  [key: string]: string | boolean | number;
}


const TaskTwo: React.FC = () => {
  const [data, setData] = useState<DataSource[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<{ [key: string]: boolean }>(() => {
    const storedVisibility = localStorage.getItem('columnVisibility');
    const defaultVisibility: { [key: string]: boolean } = {
      name: true,
      archived: true,
      createdAt: true,
      icon: true,
      itemsCount: true,
      lastImport: true,
    };
    return storedVisibility ? JSON.parse(storedVisibility) : defaultVisibility;
  });

  useEffect(() => {
    localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const GET_DATA = gql`
    query DataSources {
      collection(
        page: 0,
        limit: 100,
        identifier: "organization",
        organizationId: 19952
      ) {
        dataSources {
          id
          name
          archived
          createdAt
          icon
          itemsCount
          lastImport
        }
      }
    }
  `;

  const { loading, error, data: graphqlData } = useQuery(GET_DATA);

  useEffect(() => {
    if (!loading && graphqlData) {
      const fetchedData: DataSource[] = graphqlData.collection.dataSources;
      setData(fetchedData);

      const newColumnVisibility: { [key: string]: boolean } = {};
      Object.keys(fetchedData[0] || {}).forEach((key) => {
        newColumnVisibility[key] = columnVisibility[key] !== undefined ? columnVisibility[key] : true;
      });

      setColumnVisibility(newColumnVisibility);
    }
  }, [loading, graphqlData]);



  const toggleColumnVisibility = (columnName: string) => {
    const newVisibility = { ...columnVisibility, [columnName]: !columnVisibility[columnName] };
    setColumnVisibility(newVisibility);
    localStorage.setItem('columnVisibility', JSON.stringify(newVisibility));
  };



  const timeDifference = (timestamp: string | undefined): string => {
    if (!timestamp) {
      return 'Timestamp not available';
    }

    const currentTimestamp = new Date().getTime();
    const lastImportTimestamp = new Date(timestamp).getTime();
    const difference = currentTimestamp - lastImportTimestamp;
    const minutes = Math.floor(difference / 60000);

    return `${minutes} minutes ago`;
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
          {data.map((dataSource: DataSource) => (
            <TableRow key={dataSource.id}>
              {Object.keys(columnVisibility).map((columnName) => (
                columnVisibility[columnName] && (
                  <TableCell key={`${columnName}-${dataSource.id}`}>
                    {columnName === 'name' || columnName === 'archived' || columnName === 'itemsCount' ? (
                      dataSource[columnName]?.toString()
                    ) : columnName === 'createdAt' ? (
                      new Date(dataSource[columnName]?.toString()).toLocaleDateString('en-GB')
                    ) : columnName === 'lastImport' ? (
                      timeDifference(dataSource[columnName]?.toString())
                    ) : dataSource[columnName]}
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

export default TaskTwo;
