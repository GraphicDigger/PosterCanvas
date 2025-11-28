import React, { useMemo, useCallback } from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { Table, TableHead, TableBody, TableText } from '@/shared/uiKit/TableNew';
import { SlotBar, RightSlot } from '@/shared/uiKit/SlotBar';
import { Button } from '@/shared/uiKit/Button';
import { useActorPositions } from '@/entities/actorPosition';
import { useActorRoles, ACTOR_TYPE } from '@/entities/actorRole';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { PlusIcon } from '@/shared/assets/icons';


export const MemberPositionSettings = () => {

  const { allActorPositions } = useActorPositions();
  const { allActorRoles } = useActorRoles();

  const handleRowClick = useCallback((rowId) => {
    console.log('rowId', rowId);
  }, []);

  // Подготовка данных для таблицы
  const tableData = useMemo(() => {
    return allActorPositions.map(position => {
      const memberRolesCount = allActorRoles.filter(
        role => role.actorType === ACTOR_TYPE.MEMBER && role.positionId === position.id,
      ).length;
      const agentRolesCount = allActorRoles.filter(
        role => role.actorType === ACTOR_TYPE.AGENT && role.positionId === position.id,
      ).length;

      return {
        id: position.id,
        positionName: position.name,
        memberRolesCount,
        agentRolesCount,
      };
    });
  }, [allActorPositions, allActorRoles]);

  // Определение колонок
  const columns = useMemo(() => [
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
    {
      key: 'memberRolesCount',
      title: 'Member Roles',
      minWidth: 150,
      sortable: true,
      render: (value, record) => (
        <TableText
          cellId={`${record.id}-memberRolesCount`}
          rowId={record.id}
          columnKey="memberRolesCount"
        >
          {value}
        </TableText>
      ),
    },
    {
      key: 'agentRolesCount',
      title: 'Agent Roles',
      minWidth: 150,
      sortable: true,
      render: (value, record) => (
        <TableText
          cellId={`${record.id}-agentRolesCount`}
          rowId={record.id}
          columnKey="agentRolesCount"
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
          <Button startIcon={<PlusIcon />}>
            New Position
          </Button>
        </RightSlot>
      </SlotBar>
      <Scrollbar>
        <Stack align='start'>
          <Table
            data={tableData}
            columns={columns}
            onRowClick={handleRowClick}
          >
            <TableHead />
            <TableBody />
          </Table>
        </Stack>
      </Scrollbar>
    </Stack>
  );
};
