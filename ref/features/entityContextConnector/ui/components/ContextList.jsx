import { useMemo } from 'react';
import { List } from '@/shared/uiKit/List';
import { TaskCardListItem } from '@/entities/task';
import { ChatCardListItem } from '@/entities/chat';
import { DocumentCardListItem } from '@/entities/document';
import { CreateContextLinkButton } from '@/features/entityContextConnector/ui/components/CreateContextLinkButton';
import { ViewerTrigger } from '@/shared/uiKit/Viewer';

const COMPONENT_MAP = {
  task: TaskCardListItem,
  chat: ChatCardListItem,
  document: DocumentCardListItem,
};

export const ContextList = ({
  contextItems,
  entityId,
  entityType,
  actionSlot = true,
}) => {
  const items = useMemo(() => (
    <List>
      {contextItems?.map((item) => {
        const Component = COMPONENT_MAP[item.kind];
        if (!Component) {return null;}

        return (
          <ViewerTrigger step={3} data={item} groupId="entityContextConnector">
            <Component
              key={item.id}
              item={item}
              actionSlot={actionSlot
                ? <CreateContextLinkButton
                  entityId={entityId}
                  entityType={entityType}
                  contextId={item.id}
                  contextType={item.kind}
                />
                : null}
            />
          </ViewerTrigger>
        );
      })}

    </List>
  ), [
    contextItems,
    entityId,
    entityType,
    actionSlot,
  ]);

  return items;
};
