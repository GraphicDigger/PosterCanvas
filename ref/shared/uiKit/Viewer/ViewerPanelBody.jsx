import { Stack } from '@/shared/uiKit/Stack';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';

export const ViewerPanelBody = ({
  children,
  padding = 4,
}) => {
  return (
    <Stack
      align='flex-start'
      justify='flex-start'
      padding={padding}
    >
      {children}
    </Stack>
  );
};
