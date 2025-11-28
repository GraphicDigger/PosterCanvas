import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../types';
import { addTask, updateTask, makeSelectTaskById } from '../store';
import { ENTITY_KINDS } from '@/shared/constants';


export const useTaskMutation = () => {
  const dispatch = useDispatch();

  const handleAddTask = (task: Task) => {
    dispatch(addTask({
      ...task,
      id: `task-${uuidv4()}`,
      kind: ENTITY_KINDS.TASK,
      projectId: task.projectId || '',
      status: task.status || 'todo',

      createdBy: task.createdBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responsible: task.responsible,
      assigneeTo: task.assigneeTo,

      name: task.name || 'New Task',
      description: task.description,
      dueDate: task.dueDate,
    }));
  };

  const handleUpdateDescription = useCallback((task: Task, newDescription: string) => {
    if (!task) {return;}

    dispatch(updateTask({
      ...task,
      description: newDescription,
    }));
  }, [dispatch, makeSelectTaskById]);

  const handleUpdateTask = (task: Task) => {

  };

  const handleDeleteTask = (task: Task) => {
  };

  return {
    addTask: handleAddTask,
    updateDescription: handleUpdateDescription,
  };
};
