import { createContext, useContext } from 'react';

const TaskContext = createContext(null);

export const TaskProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <TaskContext.Provider value={value}>
    {children}
  </TaskContext.Provider>
);

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) {throw new Error('useTaskContext must be used inside <TaskProvider>');}
  return ctx;
};
