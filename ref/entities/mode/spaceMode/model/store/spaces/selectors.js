import { SPACE_MODES } from '../../constants/spaceModes';

// Селекторы для режимов space
export const selectSpaceMode = (state) => state.spaceModes.spaceMode;
export const selectIsWorkspaceMode = (state) => state.spaceModes.spaceMode === SPACE_MODES.WORKSPACE;
export const selectIsUserspaceMode = (state) => state.spaceModes.spaceMode === SPACE_MODES.USERSPACE;
