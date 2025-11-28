import React, { useCallback, useMemo } from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { Table, TableHead, TableBody, TableText } from '@/shared/uiKit/TableNew';
import { SlotBar, LeftSlot, CenterSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { useActorRoles, useActorRoleStates } from '@/entities/actorRole';
import { useActorPositions } from '@/entities/actorPosition';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { useWSSettingsMode } from '@/entities/mode/spaceMode';
import { AddRoleButton } from './components/AddRoleButton';

export const RoleTable = () => {

  const { allActorRoles } = useActorRoles();
  const { handleSelect: handleSelectActorRole } = useActorRoleStates();
  const { allActorPositions } = useActorPositions();

  const { toggleWSSettingsDetailMode } = useWSSettingsMode();

  const handleRowClick = useCallback((rowId) => {
    handleSelectActorRole(rowId);
    toggleWSSettingsDetailMode();
  }, [handleSelectActorRole, toggleWSSettingsDetailMode]);

  // Подготовка данных для таблицы с позициями
  const tableData = useMemo(() => {
    return allActorRoles.map(role => {
      const position = allActorPositions.find(position => position.id === role.positionId);
      return {
        id: role.id,
        roleName: role.name,
        actorType: role.actorType,
        positionName: position?.name || '-',
      };
    });
  }, [allActorRoles, allActorPositions]);

  // Определение колонок
  const columns = useMemo(() => [
    {
      key: 'roleName',
      title: 'Role',
      minWidth: 200,
      sortable: true,
      render: (value, record) => (
        <TableText
          cellId={`${record.id}-roleName`}
          rowId={record.id}
          columnKey="roleName"
        >
          {value}
        </TableText>
      ),
    },
    {
      key: 'actorType',
      title: 'Type',
      minWidth: 150,
      sortable: true,
      render: (value, record) => (
        <TableText
          cellId={`${record.id}-actorType`}
          rowId={record.id}
          columnKey="actorType"
        >
          {value}
        </TableText>
      ),
    },
    {
      key: 'positionName',
      title: 'Position',
      minWidth: 200,
      sortable: true,
      render: (value, record) => (
        <TableText
          cellId={`${record.id}-positionName`}
          rowId={record.id}
          columnKey="positionName"
        >
          {value}
        </TableText>
      ),
    },
  ], []);

  return (
    <Stack>

      <SlotBar>
        <RightSlot >
          <AddRoleButton uiView='text' />
        </RightSlot>
      </SlotBar>

      <Scrollbar>
        <Stack align='start' >
          <Table
            data={tableData}
            columns={columns}
            onRowClick={handleRowClick}
          >
            <TableHead size='large' />
            <TableBody size='medium' />
          </Table>
        </Stack>
      </Scrollbar>
    </Stack>
  );
};
