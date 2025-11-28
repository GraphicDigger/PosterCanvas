import React from 'react';
import { Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TableText } from './index';

export default {
  title: 'uiKit/TableNew',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    sortable: { control: 'boolean' },
    checkable: { control: 'boolean' },
    editable: { control: 'boolean' },
    loading: { control: 'boolean' },
    virtualized: { control: 'boolean' },
  },
};

// Демо данные
const demoData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
];

const demoColumns = [
  { key: 'name', title: 'Name', width: '200px', sortable: true },
  { key: 'email', title: 'Email', width: '250px', sortable: true },
  { key: 'role', title: 'Role', width: '120px', sortable: true },
  {
    key: 'status',
    title: 'Status',
    width: '100px',
    sortable: true,
    render: (value) => (
      <span style={{
        color: value === 'Active' ? 'green' : 'red',
        fontWeight: 'bold',
      }}>
        {value}
      </span>
    ),
  },
];

// Базовая таблица
export const Default = {
  args: {
    data: demoData,
    columns: demoColumns,
  },
};

// Таблица с сортировкой
export const WithSorting = {
  args: {
    data: demoData,
    columns: demoColumns,
    sortable: true,
    onSort: (sorting) => console.log('Sort:', sorting),
  },
};

// Таблица с выбором строк
export const WithSelection = {
  args: {
    data: demoData,
    columns: demoColumns,
    checkable: true,
    onSelect: (selected) => console.log('Selected:', selected),
  },
};

// Таблица с редактированием
export const WithEditing = {
  args: {
    data: demoData,
    columns: demoColumns,
    editable: true,
    onEdit: (cell) => console.log('Edit:', cell),
  },
};

// Все функции вместе
export const FullFeatured = {
  args: {
    data: demoData,
    columns: demoColumns,
    sortable: true,
    checkable: true,
    editable: true,
    onSort: (sorting) => console.log('Sort:', sorting),
    onSelect: (selected) => console.log('Selected:', selected),
    onEdit: (cell) => console.log('Edit:', cell),
  },
};

// Состояние загрузки
export const Loading = {
  args: {
    data: [],
    columns: demoColumns,
    loading: true,
  },
};

// Состояние ошибки
export const WithError = {
  args: {
    data: [],
    columns: demoColumns,
    error: 'Failed to load data',
  },
};

// Пустое состояние
export const Empty = {
  args: {
    data: [],
    columns: demoColumns,
    emptyMessage: 'No users found',
  },
};

// Ручной рендеринг
export const ManualRendering = () => {
  return (
    <Table data={demoData} columns={demoColumns} checkable sortable>
      <TableHead columns={demoColumns} />
      <TableBody>
        {demoData.map((row) => (
          <TableRow key={row.id} rowId={row.id} data={row}>
            <TableCell cellId={`${row.id}-name`} rowId={row.id} columnKey="name">
              <TableText cellId={`${row.id}-name`} rowId={row.id} columnKey="name">
                {row.name}
              </TableText>
            </TableCell>
            <TableCell cellId={`${row.id}-email`} rowId={row.id} columnKey="email">
              <TableText cellId={`${row.id}-email`} rowId={row.id} columnKey="email">
                {row.email}
              </TableText>
            </TableCell>
            <TableCell cellId={`${row.id}-role`} rowId={row.id} columnKey="role">
              {row.role}
            </TableCell>
            <TableCell cellId={`${row.id}-status`} rowId={row.id} columnKey="status">
              <span style={{
                color: row.status === 'Active' ? 'green' : 'red',
                fontWeight: 'bold',
              }}>
                {row.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter showSummary showSelection />
    </Table>
  );
};

// Компактная версия
export const Compact = {
  args: {
    data: demoData,
    columns: demoColumns.map(col => ({ ...col, width: undefined })),
    width: '600px',
  },
};
