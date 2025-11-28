import { createContext, useContext } from 'react';

const TaskAssigneeContext = createContext(null);

export const TaskAssigneeProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <TaskAssigneeContext.Provider value={value}>
    {children}
  </TaskAssigneeContext.Provider>
);

export const useTaskAssigneeContext = () => {
  const ctx = useContext(TaskAssigneeContext);
  if (!ctx) {throw new Error('useTaskAssigneeContext must be used inside <TaskAssigneeProvider>');}
  return ctx;
};
