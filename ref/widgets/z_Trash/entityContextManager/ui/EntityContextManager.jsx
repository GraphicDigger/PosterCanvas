import { Backdrop } from '@/shared/uiKit/Backdrop';
import { Stack } from '@/shared/uiKit/Stack';
import { useEntityContextManager } from '../model';
import { EntityContextConnector } from '@/features/entityContextConnector';
import { EntityManagePanel } from '@/features/multiEntityManagePanel';

export const EntityContextManager = () => {

  const {
    isOpenEntityContextConnector,
    closeConnector,
    selectedScreenWithContext,
  } = useEntityContextManager();

  return <EntityContextConnector entity={selectedScreenWithContext} />;
};
