import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Stack } from '@/shared/uiKit/Stack';
import { Divider } from '@/shared/uiKit/Divider';
import { Box } from '@/shared/uiKit/Box';
import { Typography } from '@/shared/uiKit/Typography';
import { Avatar } from '@/shared/uiKit/Avatar';
import { Button } from '@/shared/uiKit/Button';
import { Text } from '@/shared/uiKit/Text';
import { ENTITY_KINDS } from '@/shared/constants';
import {
  ViewerTrigger,
  ViewerPanel,
  ViewerPanelBody,
  ViewerPanelHeader,
  useViewer,
  LeftSlot,
} from '@/shared/uiKit/Viewer';
import { useTask, useTaskSelectors } from '../model';


export const TaskManagePanel = ({ taskId, data, config }) => {

  const { taskById } = useTaskSelectors({ id: taskId });
  const task = taskById || data;

  if (!task) {return null;}

  const { updateDescription } = useTask();

  const handleChangeDescription = (task, newDescription) => {
    updateDescription(task, newDescription);
  };

  return (
    <ViewerPanel
      minWidth={400}
      width={config?.width || 800}
      maxWidth={1000}
      anchor={config?.anchor || null}
    >
      <ViewerPanelHeader >
        <LeftSlot>
          <Button color='default'>{task.status}</Button>
        </LeftSlot>
      </ViewerPanelHeader>
      <ViewerPanelBody padding={0}>
        <DetailRow divider={false}>
          <Typography variant='heading.large' color='primary'>{task.name}</Typography>
        </DetailRow>
        <DetailRow label='Assignees'>
          {task?.assignees?.map((assignee) => (
            <Stack
              key={assignee.userId}
              direction='row'
              align='center'
              justify='flex-start'
              width='fit'
              gap={3}
              paddingRight={2}
            >
              <Avatar
                key={assignee.userId}
                src={assignee.user.avatar}
                alt={assignee.name}
                title={assignee.name}
              />
              <Stack
                direction='column'
                align='center'
                justify='flex-start'
                width='fit'
              >
                <Typography
                  variant='body.xsmall'
                  weight='semibold'
                  color='primary'
                >
                  {assignee.user.name}
                </Typography>
                <Typography
                  variant='body.xsmall'
                  color='secondary'
                >
                  {assignee.role}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </DetailRow>
        <DetailRow label='Description' direction='column'>
          <Stack >
            <Text
              size='large'
              multiline
              editable
              onChange={(newDescription) => handleChangeDescription(task, newDescription)}

            >
              {task.description}
            </Text>
          </Stack>
        </DetailRow>
        <DetailRow label='Docs' >
          {task.context?.filter(item => item.kind === ENTITY_KINDS.DOCUMENT).map((item) => (
            <ViewerTrigger key={item.id} step={2} data={item} groupId={config?.groupId}>
              <div>{item.title}</div>
            </ViewerTrigger>
          ))}
        </DetailRow>
        <DetailRow label='Chats' >
          {task.context?.filter(item => item.kind === ENTITY_KINDS.CHAT).map((item) => (
            <ViewerTrigger key={item.id} step={2} data={item} groupId={config?.groupId}>
              <div>{item.name}</div>
            </ViewerTrigger>
          ))}
        </DetailRow>
        <DetailRow label='Links' />
        <DetailRow label='Files' />
      </ViewerPanelBody>
    </ViewerPanel >

  );
};

const DetailRow = ({
  label,
  direction = 'row',
  divider = true,
  children,
  onClick,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) {onClick();}
  };

  return (
    <StyledDetailRow onClick={handleClick}>
      <Stack
        direction={direction}
        align='center'
        justify='flex-start'
        padding={4}
        gap={3}
      >
        {label &&
                    <Typography
                      variant='body.small'
                      color='secondary'
                    >
                      {label}
                    </Typography>
        }
        {children}
      </Stack>
      {divider && <Divider bottom left color={theme.sys.color.outline.low} />}
    </StyledDetailRow>
  );
};

const StyledDetailRow = styled.div`
    position: relative;
    min-height: 50px;
    width: 100%;
    cursor: pointer;
`;
