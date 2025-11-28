
import { PlusIcon } from '../../../shared/assets/icons';
import { useTask } from '../../../entities/task';
import { Button } from '../../../shared/uiKit/Button';
import { useAuth } from '@/app/sessions/auth';

export const AddTaskButton = () => {

  const { addTask } = useTask();
  const { currentMember, currentWorkspace } = useAuth();

  const handleAddTask = () => {
    addTask({
      name: 'New Task',
      createdBy: currentMember?.id,
    });
  };

  return (
    <Button
      startIcon={<PlusIcon />}
      onClick={handleAddTask}
    >
      Add Task
    </Button>
  );
};
