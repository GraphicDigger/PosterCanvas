import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PlusIcon } from '@/shared/assets/icons';
import { DropdownPopover, DropdownTrigger, Dropdown } from '@/shared/uiKit/DropdownMenu';
import { MenuItem } from '@/shared/uiKit/Menu';
import { useEntityContextConnector } from '../../model';


export const CreateContextButton = () => {

  const { addDocument, addTask, addChat } = useEntityContextConnector();

  const handleAddDocument = () => {
    addDocument({
      title: 'New Document',
      userId: 'id-member-01',
      projectId: 'id-project-01',
    });
  };

  const handleAddTask = () => {
    addTask({
      title: 'New Task',
      userId: 'id-member-01',
      projectId: 'id-project-01',
    });
  };

  const handleAddChat = () => {
    addChat({
      name: 'New Chat',
      userId: 'id-member-01',
      projectId: 'id-project-01',
    });
  };

  return (
    <DropdownPopover placement='bottom-end' offset={-28}>
      <DropdownTrigger>
        <ButtonTool>
          <PlusIcon />
        </ButtonTool>
      </DropdownTrigger>
      <Dropdown>
        <MenuItem onClick={handleAddDocument} >
                    Document
        </MenuItem>
        <MenuItem
          onClick={handleAddChat}
        >
                    Chat
        </MenuItem>
        <MenuItem onClick={handleAddTask} >
                    Task
        </MenuItem>
      </Dropdown>
    </DropdownPopover>
  );
};
