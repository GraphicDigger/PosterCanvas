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
import { useTask } from '../model';


export const ChatManagePanel = ({ chatId, data, config }) => {

  const chat = data || useChatById(chatId);
  if (!chat) {return null;}

  return (
    <ViewerPanel
      minWidth={400}
      width={800}
      maxWidth={1000}
      anchor={config?.anchor}
    >
      <ViewerPanelHeader title={data.name} />
      <ViewerPanelBody padding={6}>
        <Typography
          variant='heading.large'
          color='primary'
        >
          {data.name}
        </Typography>
      </ViewerPanelBody>
    </ViewerPanel >

  );
};
