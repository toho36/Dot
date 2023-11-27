// graphql.ts

import { request, gql } from 'graphql-request';

export interface DataSource {
  name: string;
  archived: boolean;
  createdAt: string;
  icon: string;
  itemsCount: number;
  lastImport: string;
}

interface CollectionResponse {
  collection: {
    dataSources: DataSource[];
  };
}

const endpoint = 'https://stage.dotidot.io/graphql';
const apiToken = '84e1694aa795ff75dd69d4233061ebdd';

export async function fetchData(): Promise<DataSource[]> {
  const query = gql`
    query DataSources {
      collection(
        page: 0,
        limit: 100,
        identifier: "organization"
        organizationId: 19952
      ) {
        dataSources {
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

  const headers = {
    Authorization: `ApiToken ${apiToken}`,
  };

  try {
    const response = await request<CollectionResponse>(endpoint, query, undefined, headers);
    return response.collection.dataSources;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
