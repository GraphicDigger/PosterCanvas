import { createContext, useContext, useMemo, ReactNode, FC } from 'react';
import { useSelector } from 'react-redux';
import { createRepository } from '@/shared/services/api/createRepository';
import { selectCurrentDatabaseType } from '@/entities/project';
import { registerAllMockData } from './registerMockData';
// repositories
import { ScreenRepository } from '@/entities/uiScreen';

registerAllMockData();

interface RepositoryContextType {
    screenRepository: ScreenRepository;
    // ... other repositories
}

// Data Access Layer

const RepositoryContext = createContext<RepositoryContextType | null>(null);

export const RepositoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const databaseType = useSelector(selectCurrentDatabaseType);

  const repositories = useMemo(() => {
    const dataSource = {
      type: databaseType || 'mock',
      config: {},
    };

    console.log('[RepositoryProvider] Creating repositories with dataSource:', dataSource);

    return {
      screenRepository: createRepository(
        ScreenRepository, 'screens', dataSource),
      // ... create other repositories
    };
  }, [databaseType]);

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepositories = () => {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useRepositories must be used within RepositoryProvider');
  }
  return context;
};
