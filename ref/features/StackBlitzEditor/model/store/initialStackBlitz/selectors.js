
export const selectVM = (state) => state.stackBlitz.vm;
export const selectProjectId = (state) => state.stackBlitz.projectId;
export const selectContainerId = (state) => state.stackBlitz.containerId;

export const selectIsReady = (state) => state.stackBlitz.isReady;
export const selectIsError = (state) => state.stackBlitz.isError;
export const selectErrorMessage = (state) => state.stackBlitz.errorMessage;
