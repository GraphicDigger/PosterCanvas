import React, { useMemo } from 'react';
import { Table, TableHead, TableBody, TableText } from '../../../../../shared/uiKit/TableNew';
import { Stack } from '../../../../../shared/uiKit/Stack';


export const MemberPermissionSettings = () => {

  // Общие колонки для всех таблиц
  const columns = useMemo(() => [
    {
      key: 'check',
      title: 'Check',
      width: 100,
      sortable: false,
      render: (value, record) => (
        <TableText
          cellId={`${record.id}-check`}
          rowId={record.id}
          columnKey="check"
        >
          {value}
        </TableText>
      ),
    },
    {
      key: 'permission',
      title: 'Permission',
      minWidth: 200,
      sortable: false,
      render: (value, record) => (
        <TableText
          cellId={`${record.id}-permission`}
          rowId={record.id}
          columnKey="permission"
        >
          {value}
        </TableText>
      ),
    },
  ], []);

  // Данные для таблицы Project
  const projectData = useMemo(() => [
    {
      id: 'project-1',
      check: 'Check',
      permission: 'Permission',
    },
    {
      id: 'project-2',
      check: 'Check',
      permission: 'Permission',
    },
  ], []);

  // Данные для таблицы Members
  const membersData = useMemo(() => [
    {
      id: 'members-1',
      check: 'Check',
      permission: 'Permission',
    },
    {
      id: 'members-2',
      check: 'Check',
      permission: 'Permission',
    },
  ], []);

  // Данные для таблицы Teams
  const teamsData = useMemo(() => [
    {
      id: 'teams-1',
      check: 'Check',
      permission: 'Permission',
    },
    {
      id: 'teams-2',
      check: 'Check',
      permission: 'Permission',
    },
  ], []);

  return (
    <Stack gap={6} align='start'>
      <Table
        data={projectData}
        columns={columns}
      >
        <TableHead />
        <TableBody />
      </Table>

      <Table
        data={membersData}
        columns={columns}
      >
        <TableHead />
        <TableBody />
      </Table>

      <Table
        data={teamsData}
        columns={columns}
      >
        <TableHead />
        <TableBody />
      </Table>
    </Stack>
  );
};
