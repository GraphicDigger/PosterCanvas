import { createSlice } from '@reduxjs/toolkit';
import { TABS } from '../constants/constants';
import { CODE_TYPES } from '../../../../entities/code';


const getInitialTabs = (codeType) => {
  switch (codeType) {
  case CODE_TYPES.COMPONENT:
    return [TABS.AI_CODER];
  case CODE_TYPES.SCREEN:
    return [TABS.AI_CODER];
  case CODE_TYPES.CUSTOM:
    return [TABS.ARGUMENTS, TABS.TEST_DRIVE, TABS.AI_CODER];
  case CODE_TYPES.CODEBASE:
    return [TABS.AI_CODER];
  default:
    return [TABS.AI_CODER];
  }
};

const initialState = {
  selectedTab: TABS.ARGUMENTS,
  codeType: null,
  availableTabs: [],
};

export const codeSidebarSlice = createSlice({
  name: 'CodeSidebar',
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setCodeType: (state, action) => {
      state.codeType = action.payload;
      state.availableTabs = getInitialTabs(action.payload);
      // Устанавливаем первый доступный таб если текущий недоступен
      if (!state.availableTabs.includes(state.selectedTab)) {
        state.selectedTab = state.availableTabs[0];
      }
    },
  },
});

export const {
  setSelectedTab,
  setCodeType,
} = codeSidebarSlice.actions;

export default codeSidebarSlice.reducer;
