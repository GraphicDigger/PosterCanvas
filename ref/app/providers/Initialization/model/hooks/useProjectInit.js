import { useContext } from 'react';
import { createContext } from 'react';

export const ProjectInitContext = createContext({
  isLoading: true,
  error: null,
  isInitialized: false,
  initializeData: () => {},
});


export const useProjectInit = () => {
  const context = useContext(ProjectInitContext);

  if (!context) {
    throw new Error('useProjectInit must be used within a ProjectInitProvider');
  }

  return context;
};
