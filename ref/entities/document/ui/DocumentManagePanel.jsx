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
import { useDocumentSelectors } from '../model';

export const DocumentManagePanel = ({ documentId, data, config }) => {

  const { documentById } = useDocumentSelectors({ id: documentId });
  const document = documentById || data;
  if (!document) {return null;}

  return (
    <ViewerPanel
      width={config?.width || 800}
      minWidth={400}
      maxWidth={1000}
      anchor={config?.anchor }
    >
      <ViewerPanelHeader title={document.title}>
      </ViewerPanelHeader>
      <ViewerPanelBody padding={6}>
        <Stack align='flex-start' justify='flex-start' gap={8}>
          <Typography variant='heading.xlarge'>{document.title}</Typography>
          <Typography variant='body.medium'>{document.content}</Typography>
        </Stack>
      </ViewerPanelBody>
    </ViewerPanel >

  );
};
