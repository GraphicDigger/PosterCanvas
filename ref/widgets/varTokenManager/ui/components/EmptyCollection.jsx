import { Stack } from '../../../../shared/uiKit/Stack';
import { AddCollection } from '../../../../features/TokenAndPresetControl';
import { ENTITY_KINDS } from '../../../../shared/constants';

export const EmptyCollection = () => {
  return (
    <Stack align='center' justify='center' >
      <AddCollection
        type={ENTITY_KINDS.TOKEN_COLLECTION}
        uiView='button'
      />
    </Stack>
  );
};
