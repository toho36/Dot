import { useQuery } from '@apollo/client';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import gql from 'graphql-tag';
import React from 'react';

interface DataSource {
  id: number;
  name: string;
  archived: boolean;
  createdAt: string;
  icon: string;
  itemsCount: number;
  lastImport: string;
}

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

const TaskOne: React.FC = () => {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const dataSourceList: DataSource[] = data.collection.dataSources;

  const timeDifference = (timestamp: string | undefined): string => {
    if (!timestamp) {
      return 'Timestamp not available';
    }

    const currentTimestamp = new Date().getTime();
    const lastImportTimestamp = new Date(timestamp).getTime();
    const difference = currentTimestamp - lastImportTimestamp;
    const minutes = Math.floor(difference / 60000); // Convert milliseconds to minutes

    return `${minutes} minutes ago`;
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Archived</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Last Import</TableCell>
            <TableCell>Items Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSourceList.map((dataSource: DataSource) => (
            <TableRow key={dataSource.id}>
              <TableCell>{dataSource.name}</TableCell>
              <TableCell>{dataSource.archived ? 'true' : 'false'}</TableCell>
              <TableCell>
                {new Date(dataSource.createdAt).toLocaleDateString('en-GB')}
              </TableCell>
              <TableCell>{timeDifference(dataSource.lastImport)}</TableCell>
              <TableCell>{dataSource.itemsCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskOne;
