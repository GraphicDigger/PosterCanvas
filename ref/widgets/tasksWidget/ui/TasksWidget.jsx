import React, { useMemo, useRef, useState } from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { SlotBar, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { Text } from '@/shared/uiKit/Text';
import { Button } from '@/shared/uiKit/Button';
import { Table, TableHead, TableBody, TableText } from '@/shared/uiKit/TableNew';
import { useTask, TaskDetail } from '@/entities/task';
import { useViewer, ViewerWindow, ViewerProvider, Viewer } from '@/shared/uiKit/Viewer';
import { Box } from '@/shared/uiKit/Box';
import { Avatar, AvatarGroup } from '@/shared/uiKit/Avatar';
import { useClickOutside } from '@/shared/lib';
import { MultiEntityManagePanel } from '@/features/multiEntityManagePanel';
import { AddTaskButton } from '@/features/taskActions';
import { useAuth } from '@/app/sessions/auth';

export const TasksWidget = () => {
  return (
    <ViewerProvider mode="single">
      <Widget />
    </ViewerProvider>
  );
};

const Widget = () => {

  const { openViewerStep } = useViewer();

  const { currentUser, currentWorkspace } = useAuth();
  const { memberTasks, allTasks } = useTask({ userId: currentUser?.id, workspaceId: currentWorkspace?.id });

  // console.log('[tasksWidget] allTasks', allTasks);

  const openTaskDetail = (data) => {
    openViewerStep(1, data, undefined, 'taskManager');
  };

  const handleSort = (sorting) => {
    console.log('add logic to sort data:', sorting);
  };

  const tableData = useMemo(() => {
    return memberTasks?.map(task => ({
      id: task.id,
      ...task,
    })) || [];
  }, [memberTasks]);

  const tableColumns = useMemo(() => {
    return [
      {
        key: 'name',
        title: 'Name',
        minWidth: 300,
        sortable: true,
        onClick: (e, rowData) => openTaskDetail(rowData),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: 120,
        sortable: true,
      },
      {
        key: 'assignees',
        title: 'Assignees',
        minWidth: 150,
        // sortable: true,
        render: (value, rowData) => (
          <AvatarGroup size='medium'>
            {rowData.assignees.map((a) => (
              <Avatar
                key={a.userId}
                src={a.user.avatar}
                alt={a.name}
                title={a.name}
              />
            ))}
          </AvatarGroup>
        ),
      },
      {
        key: 'project',
        title: 'Project',
        minWidth: 100,
        render: (value, rowData) => (
          <TableText>{rowData?.project?.name}</TableText>
        ),
        // sortable: true,
      },
      {
        key: 'dueDate',
        title: 'Due Date',
        minWidth: 120,
        // sortable: true,
      },
    ];
  }, []);

  return (
    <Stack justify='flex-start' align='flex-start' spacing={2}>
      <SlotBar divider>
        <LeftSlot padding={2}>
          <Text weight='bold' size='medium'>Task Manager</Text>
        </LeftSlot>
        <RightSlot padding={2}>
          <AddTaskButton />
        </RightSlot>
      </SlotBar>

      <Table
        data={tableData}
        columns={tableColumns}
        sortable={true}
        checkable={true}
        editable={false}
        scrollable={true}
        onSort={handleSort}
        loading={false}
        error={null}
      >
        <TableHead size='large' />
        <TableBody size='large' />
      </Table>

      <Viewer
        position="right"
        backdrop={false}
        groupId="taskManager"
      >

        <ViewerWindow step={1}>
          <MultiEntityManagePanel
            config={{
              anchor: 'right',
              groupId: 'taskManager',
            }} />
        </ViewerWindow>

        <ViewerWindow step={2}>
          <MultiEntityManagePanel
            config={{
              anchor: 'right',
              groupId: 'taskManager',
            }} />
        </ViewerWindow>

      </Viewer>

    </Stack>
  );
};
