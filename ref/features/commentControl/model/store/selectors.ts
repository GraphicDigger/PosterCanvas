import { RootState } from '@/app/store';

export const selectCommentControlState = (state: RootState) => state.commentControl;

export const selectIsOpenReplies = (state: RootState) => selectCommentControlState(state).isOpenReplies;
export const selectAbsolutePinPosition = (state: RootState) => selectCommentControlState(state).absolutePinPosition;
export const selectRelativePinPosition = (state: RootState) => selectCommentControlState(state).relativePinPosition;
