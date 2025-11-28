import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionUIStates';


const initialState = {
  ...initialUIState,
};

const entityManagePanelSlice = createSlice({
  name: 'entityManagePanel',
  initialState,
  reducers: {
    ...actionsUIState,
  },
});

export const {

  setIsOpenEntityManagePanel,
  toggleIsOpenEntityManagePanel,

} = entityManagePanelSlice.actions;

export default entityManagePanelSlice.reducer;
