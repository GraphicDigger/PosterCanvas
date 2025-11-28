export const initialStackBlitz = {
  vm: null,
  isReady: false,
  isError: false,
  errorMessage: '',
  projectId: 'ude-frontend',
  containerId: 'stackblitz-container',
};

export const actionsInitialStackBlitz = {
  setVM: (state, action) => {
    state.vm = action.payload;
  },
  setIsReady: (state, action) => {
    state.isReady = action.payload;
  },
  setError: (state, action) => {
    state.isError = true;
    state.errorMessage = action.payload;
  },
  clearError: (state) => {
    state.isError = false;
    state.errorMessage = '';
  },
  setProjectId: (state, action) => {
    state.projectId = action.payload;
  },
  resetStackBlitzState: () => initialStackBlitz,
};

