// entities/project/model/hooks/useProjectMutation.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  addProject,
  updateProject,
  removeProject,
  updateProjectSettings,
  updateProjectWorkspace,
  updateProjectStatus,
  setSelectedProjectId,
} from '../store';


export const useProjectMutation = () => {
  const dispatch = useDispatch();

  // new project
  const handleCreateProject = useCallback((projectData) => {
    const newProject = {
      id: uuidv4(),
      name: '',
      workspaceId: '',
      description: '',
      status: 'development',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      settings: {
        databaseType: 'mock',
      },
      ...projectData,
    };

    dispatch(addProject(newProject));
    dispatch(setSelectedProjectId(newProject.id));
    return newProject;
  }, [dispatch]);


  // update project
  const handleUpdateProject = useCallback((id, updates) => {
    if (!id || !updates) {return;}

    const projectUpdate = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    dispatch(updateProject({ id, ...projectUpdate }));
  }, [dispatch]);


  // delete project
  const handleDeleteProject = useCallback((projectId) => {
    if (!projectId) {return;}

    dispatch(setSelectedProjectId(null));
    dispatch(removeProject(projectId));
  }, [dispatch]);


  // duplicate project
  const handleDuplicateProject = useCallback((originalProjectId, originalProject) => {
    if (!originalProject) {return;}

    const duplicatedProject = {
      ...originalProject,
      id: uuidv4(),
      name: `${originalProject.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addProject(duplicatedProject));
    dispatch(setSelectedProjectId(duplicatedProject.id));
    return duplicatedProject;
  }, [dispatch]);


  // update project workspace
  const handleMoveProjectToWorkspace = useCallback((projectId, workspaceId) => {
    if (!projectId || !workspaceId) {return;}

    dispatch(updateProjectWorkspace({ id: projectId, workspaceId }));
    dispatch(updateProject({
      id: projectId,
      updatedAt: new Date().toISOString(),
    }));
  }, [dispatch]);


  // update project status
  const handleUpdateProjectStatus = useCallback((projectId, status) => {
    if (!projectId || !status) {return;}

    dispatch(updateProjectStatus({ id: projectId, status }));
    dispatch(updateProject({
      id: projectId,
      updatedAt: new Date().toISOString(),
    }));
  }, [dispatch]);


  // update project settings
  const handleUpdateProjectSettings = useCallback((projectId, settings) => {
    if (!projectId || !settings) {return;}

    dispatch(updateProjectSettings({
      id: projectId,
      settings,
    }));
    dispatch(updateProject({
      id: projectId,
      updatedAt: new Date().toISOString(),
    }));

    console.log('updateProjectSettings', projectId, settings);
  }, [dispatch]);


  return {
    createProject: handleCreateProject,
    updateProject: handleUpdateProject,
    deleteProject: handleDeleteProject,
    duplicateProject: handleDuplicateProject,
    moveProjectToWorkspace: handleMoveProjectToWorkspace,
    updateProjectStatus: handleUpdateProjectStatus,
    updateProjectSettings: handleUpdateProjectSettings,
  };
};
