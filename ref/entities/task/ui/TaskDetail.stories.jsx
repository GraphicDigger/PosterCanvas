import React from 'react';
import { TaskDetail } from './TaskManagePanel';
import { ViewerWrapper, ViewerPanel, ViewerPanelHeader, ViewerPanelBody, ViewerProvider } from '@/shared/uiKit/Viewer';

const data = {
  id: '1',
  name: 'New approval',
  projectId: '1',
  creatorMemberId: '1',
  responsibleMemberId: '1',
  status: 'In Progress',
  description: 'Description 1',
  dueDate: '2024-03-28',
  assignees: [
    {
      memberId: '1',
      userId: '1',
      position: 'Designer',
      role: 'UX Designer',
      user: {
        avatar: '/src/shared/assets/dummy/avatar.png',
        name: 'John Doe',
      },
    },
    {
      memberId: '2',
      userId: '2',
      position: 'Developer',
      role: 'Frontend Developer',
      user: {
        avatar: '/src/shared/assets/dummy/avatar_4.png',
        name: 'Jane Doe',
      },
    },
  ],
};

const ViewerProviderWrapper = (story) => (
  <ViewerProvider>
    {story()}
  </ViewerProvider>
);

export default {
  title: 'entities/task/TaskDetail',
  component: TaskDetail,
  decorators: [ViewerProviderWrapper],
};

const Template = (args) => {
  return (
    <div style={{ width: '600px', height: '100vh' }}>
      <TaskDetail {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {

};

export const DisplayInViewer = () => {
  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <ViewerPanel
        minWidth={400}
        width={800}
        maxWidth={1000}
        anchor='right'
      >
        <ViewerPanelHeader title='Task' />
        <ViewerPanelBody padding={0}>
          <TaskDetail data={data} />
        </ViewerPanelBody>
      </ViewerPanel>
    </div>
  );
};

