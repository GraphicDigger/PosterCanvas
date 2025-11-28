import { createContext, useContext } from 'react';

const ProjectMemberContext = createContext(null);

export const ProjectMemberProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <ProjectMemberContext.Provider value={value}>
    {children}
  </ProjectMemberContext.Provider>
);

export const useProjectMemberContext = () => {
  const ctx = useContext(ProjectMemberContext);
  if (!ctx) {throw new Error('useProjectMemberContext must be used inside <ProjectMemberProvider>');}
  return ctx;
};
