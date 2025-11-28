import type { EntityState } from '@reduxjs/toolkit';

export interface CommentModel {
    id: string;
    kind: string;
    parentId: string | null;
    targetId: string | null;
    targetType: string | null;
    text: string;
    memberId: string;
    createdAt: string;
    likes: number;
    pin?: PinModel;
}

export interface PinModel {

    x: number;
    y: number;
}

export type NewComment = Omit<CommentModel,
    'createdAt' |
    'updatedAt' |
    'likes' |
    'kind' |
    'parentId'
>;

export type NewReply = Omit<CommentModel,
    'id' |
    'createdAt' |
    'updatedAt' |
    'likes' |
    'kind'
>;

export interface PinPosition {
    left: number;
    top: number;
}

export interface CommentUIState {
    hoveredCommentId: string | null;
    focusedCommentId: string | null;
    selectedCommentId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface CommentState extends EntityState<CommentModel, string>, CommentUIState { }
