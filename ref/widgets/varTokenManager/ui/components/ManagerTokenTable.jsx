/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { ENTITY_KINDS } from '@/shared/constants';
import { Table, TableHead, TableBody, TableText } from '@/shared/uiKit/TableNew';
import { Stack } from '@/shared/uiKit/Stack';
import { Text } from '@/shared/uiKit/Text';
import { useTokenCollection } from '@/entities/varTokenCollection';
import { useTokenAndPresetControl, AddVariableMode, AddCollection } from '@/features/TokenAndPresetControl';
import { VARIABLE_MODE_TYPE, useVariableModes } from '@/entities/varMode';
import { useToken } from '@/entities/varToken';
import { useTokenValueMutation } from '@/entities/varTokenValue';
import { AddTokenButton } from '@/features/TokenAndPresetControl';
import { EmptyCollection } from './EmptyCollection';


export const ManagerTokenTable = () => {

  const { addCollection } = useTokenAndPresetControl();
  const { defaultVariableModeByIds } = useVariableModes();
  const { collectionTokensAndModes, selectedTokenCollectionId, allTokenCollections } = useTokenCollection();
  const { updateToken } = useToken();
  const { updateTokenValue } = useTokenValueMutation();

  const handleEditToken = (tokenId, name) => {
    updateToken({ id: tokenId, updates: { name } });
  };

  const handleEditTokenValue = (tokenId, modeId, value) => {
    updateTokenValue(tokenId, modeId, value);
  };

  const { tokens, modes } = collectionTokensAndModes;

  const defaultMode = modes.find(m => m.isDefault);

  // prepare data
  const tableData = useMemo(() => {
    return tokens?.map(token => ({
      id: token.id,
      ...token,
    })) || [];
  }, [tokens]);

  // prepare columns
  const tableColumns = useMemo(() => {
    const columns = [
      {
        key: 'name',
        title: 'Name',
        minWidth: 200,
        sortable: true,
        render: (value, record) => (
          <TableText
            cellId={`${record.id}-name`}
            rowId={record.id}
            columnKey="name"
            editable={true}
          >
            {record.name}
          </TableText>
        ),
      },
    ];

    // add columns for each mode
    modes.forEach(mode => {
      columns.push({
        key: mode.id,
        title: mode.name,
        minWidth: 200,
        sortable: true,
        render: (value, record) => {
          const tokenValue = record.modeValues[mode.id] ?? record.modeValues[defaultMode?.id];
          return (
            <TableText
              cellId={`${record.id}-${mode.id}`}
              rowId={record.id}
              columnKey={mode.id}
              editable={true}
            >
              {tokenValue ?? '-'}
            </TableText>
          );
        },
      });
    });

    // last column
    columns.push({
      key: 'addMode',
      title: (
        <AddVariableMode
          type={VARIABLE_MODE_TYPE.TOKEN_MODE}
          collectionId={selectedTokenCollectionId}
        />
      ),
      minWidth: 100,
      sortable: false,
      render: () => null, // empty content in rows
    });
    return columns;
  }, [modes, defaultMode, selectedTokenCollectionId]);

  if (!selectedTokenCollectionId) { return <EmptyCollection />; }

  const handleCellEdit = ({ rowId, columnKey, newValue }) => {
    if (columnKey === 'name') {
      handleEditToken(rowId, newValue);
    } else if (columnKey === 'addMode') {
      return;
    } else {
      handleEditTokenValue(rowId, columnKey, newValue);
    }
  };

  const handleSort = (sorting) => {
    console.log('Sort by:', sorting);
  };

  // console.log(' [TokenManagerContent] allTokenCollections', allTokenCollections)
  // console.log(' [TokenManagerContent] modes', collectionTokensAndModes.modes)
  // console.log(' [TokenManagerContent] tokens', collectionTokensAndModes.tokens)

  return (
    <StyledContent>
      <Table
        data={tableData}
        columns={tableColumns}

        // functionality
        sortable={true}
        checkable={false}
        editable={true}
        scrollable={true}

        // event handlers
        onSort={handleSort}
        onEdit={handleCellEdit}

        // states
        loading={false}
        error={null}
        emptyMessage={
          <>
            This collection doesn't have any tokens yet.
            <AddTokenButton />
          </>
        }
      >
        <TableHead size='large' />
        <TableBody size='small' />
      </Table>
    </StyledContent>
  );
};

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 16px 0 0;
`;
