import { Stack } from '../../../../shared/uiKit/Stack';
import dummyImage from '../../../../shared/assets/dummy/website.webp';
import { Preview } from '../../../../shared/uiKit/Preview';

export const WebScanDialog = () => {
  return (
    <Stack direction='column' gap={4}>
      <Preview imageUrl={dummyImage} fit={true} />
    </Stack>
  );
};
