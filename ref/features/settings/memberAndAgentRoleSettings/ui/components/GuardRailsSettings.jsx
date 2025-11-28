import React, { useMemo } from 'react';
import { Table, TableHead, TableBody, TableText } from '@/shared/uiKit/TableNew';
import { Stack } from '@/shared/uiKit/Stack';


export const AgentGuardRailsSettings = () => {

  // Подготовка данных для таблицы
  const tableData = useMemo(() => [
    {
      id: 1,
      check: 'Check',
      guardRails: 'Guard Rails',
    },
    {
      id: 2,
      check: 'Check',
      guardRails: 'Guard Rails',
    },
  ], []);

  // Определение колонок
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
      key: 'guardRails',
      title: 'Guard Rails',
      minWidth: 200,
      sortable: false,
      render: (value, record) => (
        <TableText
          cellId={`${record.id}-guardRails`}
          rowId={record.id}
          columnKey="guardRails"
        >
          {value}
        </TableText>
      ),
    },
  ], []);

  return (
    <Stack gap={6} align='start'>
      <Table
        data={tableData}
        columns={columns}
      >
        <TableHead />
        <TableBody />
      </Table>
    </Stack>
  );
};
