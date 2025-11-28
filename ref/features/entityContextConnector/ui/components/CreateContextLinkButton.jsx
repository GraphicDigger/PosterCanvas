import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PlusIcon } from '@/shared/assets/icons';
import { useEntityContextConnector } from '../../model';

export const CreateContextLinkButton = ({
  entityId,
  entityType,
  contextId,
  contextType,
}) => {

  const { addContextLink } = useEntityContextConnector();

  const handleAddContextLink = () => {
    const contextLink = {
      entityId: entityId,
      entityType: entityType,
      contextId: contextId,
      contextType: contextType,
      relation: 'attached',
    };
    addContextLink(contextLink);
  };

  return (
    <ButtonTool onClick={handleAddContextLink}>
      <PlusIcon />
    </ButtonTool>
  );
};
