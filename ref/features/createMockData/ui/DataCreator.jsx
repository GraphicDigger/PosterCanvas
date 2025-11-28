import React from 'react';
import styled from '@emotion/styled';
import { Button } from '../../../shared/uiKit/Button';
import { useDataCreator } from '../model/hooks/useDataCreator';
import { Stack } from '../../../shared/uiKit/Stack';
import { useDataModelStates } from '../../../entities/dataModel';
import { useDataModels } from '../../../entities/dataModel';

export const DataCreator = () => {

  const { allModels } = useDataModels();
  const { createMockData, loading, isCreated } = useDataCreator();

  // console.log('[DataCreator] allModels', allModels[0]);

  const handleCreateMockData = () => {
    createMockData();

  };

  return (
    <>
      {!isCreated &&
        <Stack justify='center' align='center'>
          <Button
            onClick={handleCreateMockData}
            disabled={loading}
          >
            {loading ? 'Creating data...' : 'Create starter collections'}
          </Button>
        </Stack>
      }
    </>
  );
};

const CreatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  width: 100%;
`;

const CreatedStatus = styled.div`
  font-size: 14px;
  color: #8c8c8c;
`;
