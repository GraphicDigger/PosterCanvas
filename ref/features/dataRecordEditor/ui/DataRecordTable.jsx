import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TableText } from '@/shared/uiKit/TableNew';
import { Stack } from '@/shared/uiKit/Stack';
import { DataCreator } from '@/features/createMockData';
import { SlotBar, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { Text } from '@/shared/uiKit/Text';
import { Button } from '@/shared/uiKit/Button';
import { AiIcon, PlusIcon } from '@/shared/assets/icons';
import { AddDataRecordButton } from '@/features/dataRecordEditor';
import { DataRecordTableRow } from '@/entities/dataRecord';
import { Surface } from '@/shared/uiKit/Surface';
import { useRecordEditor } from '../model';
import { useViewer, ViewerTrigger } from '../../../shared/uiKit/Viewer';

export const DataRecordTable = () => {

  const theme = useTheme();

  const {
    records,
    rawRecords,
    selectedModel,
    filteredModelFieldsInTableMode,
    selectRecord,
    getRecordFieldValue,
  } = useRecordEditor();

  console.log('[DataRecordTable] filteredModelFieldsInTableMode', filteredModelFieldsInTableMode);


  // Подготавливаем данные для новой таблицы
  const tableData = useMemo(() => {
    return records?.map(record => ({
      id: record.id,
      ...record,
    })) || [];
  }, [records]);

  // Подготавливаем колонки для новой таблицы
  const tableColumns = useMemo(() => {
    return filteredModelFieldsInTableMode?.map(modelField => ({
      key: modelField.id,
      title: modelField.label,
      minWidth: 200,
      sortable: true,
      // onClick: (e, rowData) => openRecordDetail(rowData),
      render: (value, record) => (
        <ViewerTrigger
          step={[1, 2]}
          groupId='dataRecord'
          data={record}
        >
          <TableText
            cellId={`${record.id}-${modelField.id}`}
            rowId={record.id}
            columnKey={modelField.id}
            editable={true}
          >
            {getRecordFieldValue(record.id, modelField.id)}
          </TableText>
        </ViewerTrigger>
      ),
    })) || [];
  }, [filteredModelFieldsInTableMode, records, getRecordFieldValue]);

  // Handlers for table events
  const handleSelectRecord = (rowId) => {
    selectRecord(rowId);
  };

  const handleCellEdit = ({ rowId, columnKey, newValue }) => {
    console.log('Edit cell:', { rowId, columnKey, newValue });
    // add logic to update data
  };

  const handleSort = (sorting) => {
    console.log('Sort by:', sorting);
    // add logic to sort data
  };

  // console.log('[DataRecordTable] rawRecords', rawRecords)
  // console.log('[DataRecordTable] records', records)


  return (
    <Stack align='flex-start'>
      <SlotBar divider>
        <LeftSlot padding={2}>
          <Text weight='bold'>
            {selectedModel?.label}
          </Text>
        </LeftSlot>
        <RightSlot>
          <Stack direction='row' gap={2}>
            <Button color='default' startIcon={<PlusIcon />}> Filter </Button>
            <Button color='default' startIcon={<PlusIcon />}> Select </Button>
            <Button color='default' startIcon={<PlusIcon />}> Import CSV </Button>
            <Button color='default' startIcon={<PlusIcon />}> Export </Button>
            <Button color='default' startIcon={<PlusIcon />}> Settings </Button>
            <AddDataRecordButton uiView='button' />
          </Stack>
        </RightSlot>
      </SlotBar>
      <Table
        data={tableData}
        columns={tableColumns}

        // Функциональность
        sortable={true}
        checkable={true}
        editable={false}
        scrollable={true}

        // Обработчики событий
        onRowClick={handleSelectRecord}
        // isRowSelected={getIsSelected}
        onSort={handleSort}
        onEdit={handleCellEdit}

        // Состояния
        loading={false}
        error={null}
        emptyMessage={
          <>
            This Model doesn't have any items yet.
            <Stack direction='row' gap={2} height='fit' width='fit' >
              <Button color='default' startIcon={<AiIcon />}> Generate Simple Items </Button>
              <AddDataRecordButton uiView='button' />
            </Stack>
          </>
        }
      >
        <TableHead size='large' />
        <TableBody size='small' />
        {/* <TableFooter showSummary showSelection /> */}
      </Table>
    </Stack>
  );

};
