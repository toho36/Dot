
import { useMutation } from '@apollo/client';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { UPDATE_DATA_SOURCE } from '../Utils/graphqlQueries';


export const useHandleNameChange = (id: number, name: string) => {
  const [nameValue, setNameValue] = useState<string>(name);
  const [updateDataSource] = useMutation(UPDATE_DATA_SOURCE);

  const handleNameChange = (newName: string) => {
    setNameValue(newName)
    debouncedUpdate(newName);
  };

  const debouncedUpdate = useCallback(debounce(
    (newName: string) => {
      if (!newName.trim()) {
        console.error('Invalid name provided:', newName);
        return;
      }
      try {
        updateDataSource({
          variables: {
            id,
            name: newName,
          },
        });
      } catch (error) {
        console.error('Error updating name:', error);
      }
    },
    300
  ), []);

  return { handleNameChange, nameValue };
};

export const useHandleArchivedChange = () => {
  const [updateDataSource] = useMutation(UPDATE_DATA_SOURCE);

  const handleArchivedChange = useCallback(
    async (id: number, newArchivedValue: boolean) => {
      try {
        await updateDataSource({
          variables: {
            id,
            archived: newArchivedValue,
          },
        });
      } catch (error) {
        console.error('Error updating archived status:', error);
      }
    },
    [updateDataSource]
  );

  return handleArchivedChange;
};
