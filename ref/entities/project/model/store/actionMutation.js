
export const actionMutations = {

  // add project
  addProject: (state, action) => {
    const project = action.payload;

    // Добавляем в entities и ids
    state.entities[project.id] = project;
    if (!state.ids.includes(project.id)) {
      state.ids.push(project.id);
    }
  },

  // update project
  updateProject: (state, action) => {
    const { id, ...update } = action.payload;
    const oldProject = state.entities[id];

    if (oldProject) {
      state.entities[id] = {
        ...oldProject,
        ...update,
      };
    }
  },

  // remove project
  removeProject: (state, action) => {
    const projectId = action.payload;
    const project = state.entities[projectId];

    if (project) {
      // Удаляем из entities и ids
      delete state.entities[projectId];
      state.ids = state.ids.filter(id => id !== projectId);

      // Сбрасываем UI состояния для удаленного проекта
      if (state.selectedProjectId === projectId) {
        state.selectedProjectId = null;
      }
      if (state.focusedProjectId === projectId) {
        state.focusedProjectId = null;
      }
      if (state.hoveredProjectId === projectId) {
        state.hoveredProjectId = null;
      }

      // Удаляем из поискового фильтра
      if (state.searchFilter && state.searchFilter.selectedProjectIds) {
        state.searchFilter.selectedProjectIds = state.searchFilter.selectedProjectIds
          .filter(id => id !== projectId);
      }
    }
  },

  // update project settings
  updateProjectSettings: (state, action) => {
    const { id, settings } = action.payload;
    const project = state.entities[id];

    if (project) {
      state.entities[id] = {
        ...project,
        settings: {
          ...project.settings,
          ...settings,
        },
      };
    }
  },

  // update project workspace
  updateProjectWorkspace: (state, action) => {
    const { id, workspaceId } = action.payload;
    const project = state.entities[id];

    if (project) {
      state.entities[id] = {
        ...project,
        workspaceId,
      };
    }
  },

  // update project status
  updateProjectStatus: (state, action) => {
    const { id, status } = action.payload;
    const project = state.entities[id];

    if (project) {
      state.entities[id] = {
        ...project,
        status,
      };
    }
  },
};
