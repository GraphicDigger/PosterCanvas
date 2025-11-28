
export const initialUIState = {
  isOpenEntityManagePanel: false,
};

export const actionsUIState = {
  setIsOpenEntityManagePanel: (state, action) => {
    state.isOpenEntityManagePanel = action.payload;
  },
  toggleIsOpenEntityManagePanel: (state) => {
    state.isOpenEntityManagePanel = !state.isOpenEntityManagePanel;
  },
};
