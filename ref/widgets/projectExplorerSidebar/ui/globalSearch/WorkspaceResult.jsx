import React, { useMemo } from 'react';
import { ItemCard, CardAvatar, CardTitle, CardSubtitle, CardBody } from '@/shared/uiKit/ItemCard';
import { List } from '@/shared/uiKit/List';
import { Avatar } from '@/shared/uiKit/Avatar';
import { useSearchFilters } from '@/features/globalSearchSettings';
import { useDocument } from '@/entities/document';
import { useTask } from '@/entities/task';
import { useChat } from '@/entities/chat';
import { useMembers } from '@/entities/actorMember';


export const WorkspaceResult = () => {

  const { allDocuments } = useDocument();
  const { allTasks } = useTask();
  const { allChats } = useChat();
  const { allMembers } = useMembers();

  console.log('allMembers', allMembers);

  const {
    includeTasks,
    includeDocuments,
    includeChats,
    selectedProjectIds,
  } = useSearchFilters();

  const searchResults = useMemo(() => {
    const results = [];
    const shouldFilterByProjects = selectedProjectIds && selectedProjectIds.length > 0;

    if (includeDocuments && allDocuments) {
      let documentsToShow = allDocuments;

      if (shouldFilterByProjects) {
        documentsToShow = allDocuments.filter(doc =>
          selectedProjectIds.includes(doc.projectId),
        );
      }

      results.push(...documentsToShow.map(doc => {
        const member = allMembers.find(u => u.id === doc.userId);
        return {
          ...doc,
          type: 'document',
          title: doc.name,
          subtitle: `Last modified: ${doc.modifiedAt}`,
          content: doc.description,
          avatar: member?.avatar,
        };
      }));
    }

    if (includeTasks && allTasks) {
      let tasksToShow = allTasks;

      if (shouldFilterByProjects) {
        tasksToShow = allTasks.filter(task =>
          selectedProjectIds.includes(task.projectId),
        );
      }

      results.push(...tasksToShow.map(task => {
        const member = allMembers.find(u => u.id === task.userId);
        return {
          ...task,
          type: 'task',
          title: task.name,
          subtitle: `Status: ${task.status}`,
          content: task.description,
          avatar: member?.avatar,
        };
      }));
    }

    if (includeChats && allChats) {
      let chatsToShow = allChats;

      if (shouldFilterByProjects) {
        chatsToShow = allChats.filter(chat =>
          selectedProjectIds.includes(chat.projectId),
        );
      }

      results.push(...chatsToShow.map(chat => {
        const member = allMembers.find(u => u.id === chat.userId);
        return {
          ...chat,
          type: 'chat',
          title: chat.name,
          subtitle: `Last message: ${chat.lastMessage}`,
          content: chat.preview,
          avatar: member?.avatar,
        };
      }));
    }

    return results;
  }, [allDocuments, allTasks, allChats, allMembers, includeDocuments, includeTasks, includeChats, selectedProjectIds]);

  if (!allMembers) {
    return <div>Loading allMembers...</div>;
  }


  return (
    <List gap={0}>
      {searchResults.map(item => (
        <ItemCard key={`${item.type}-${item.id}`}>
          <CardAvatar >
            <Avatar src={item.avatar} />
          </CardAvatar>
          <CardTitle>{item.title}</CardTitle>
          <CardSubtitle>{item.subtitle}</CardSubtitle>
          <CardBody>{item.content}</CardBody>
        </ItemCard>
      ))}
    </List>
  );
};
