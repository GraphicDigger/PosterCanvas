
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setWorkspaces: (state, action) => {
    const workspaces = action.payload;
    state.ids = workspaces.map(role => role.id);
    state.entities = workspaces.reduce((acc, workspace) => {
      acc[workspace.id] = workspace;
      return acc;
    }, {});
  },
};
