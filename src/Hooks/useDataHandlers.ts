
import { useMutation } from '@apollo/client';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { UPDATE_DATA_SOURCE } from '../Utils/graphqlQueries';


export const useHandleNameChange = () => {
  const [inputValues, setInputValues] = useState<{ [id: number]: string }>({});
  const [updateDataSource] = useMutation(UPDATE_DATA_SOURCE);

  const handleNameChange = (id: number, newName: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: newName,
    }));

    debouncedUpdate(id, newName);
  };

  const debouncedUpdate = debounce(
    async (id: number, newName: string) => {
      if (!newName.trim()) {
        console.error('Invalid name provided:', newName);
        return;
      }
      try {
        await updateDataSource({
          variables: {
            id,
            name: newName,
          },
        });
      } catch (error) {
        console.error('Error updating name:', error);
      }
    },
    1000
  );

  return { handleNameChange, inputValues };
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
