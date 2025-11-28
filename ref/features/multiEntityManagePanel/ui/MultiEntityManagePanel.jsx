import { useMemo } from 'react';
import { TaskManagePanel } from '@/entities/task';
import { DocumentManagePanel } from '@/entities/document';
import { ChatManagePanel } from '@/entities/chat';
import { Stack } from '@/shared/uiKit/Stack';

export const MultiEntityManagePanel = ({
  entityId,
  entityKind,
  data,
  config,
}) => {

  const content = useMemo(() => {
    switch (data?.kind ?? entityKind) {
    case 'task':
      return (
        <TaskManagePanel
          taskId={entityId}
          data={data}
          config={config}
        />
      );
    case 'document':
      return (
        <DocumentManagePanel
          documentId={entityId}
          data={data}
          config={config}
        />
      );
    case 'chat':
      return (
        <ChatManagePanel
          chatId={entityId}
          data={data}
          config={config}
        />
      );
    default:
      return <Stack align='center' justify='center'>Preview Mode</Stack>;
    }
  }, [data, entityKind, entityId]);

  return content || null;
};
