export const initialEntities = {
  ids: [],
  entities: {},
};

export const actionsQueries = {
  setProjects: (state, action) => {
    const projects = action.payload;
    state.entities = projects.reduce((acc, project) => {
      acc[project.id] = project;
      return acc;
    }, {});
    state.ids = projects.map(project => project.id);
  },
};
