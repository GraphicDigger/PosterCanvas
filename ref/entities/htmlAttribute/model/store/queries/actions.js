
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setHtmlAttrs: (state, action) => {
    const htmlAttrs = action.payload;
    state.ids = htmlAttrs.map(role => role.id);
    state.entities = htmlAttrs.reduce((acc, htmlAttr) => {
      acc[htmlAttr.id] = htmlAttr;
      return acc;
    }, {});
  },
};
