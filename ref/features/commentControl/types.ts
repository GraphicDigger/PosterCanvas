export interface CommentControlState {
    absolutePinPosition: { x: number, y: number } | null;
    relativePinPosition: { targetId: string, relativeX: number, relativeY: number } | null;
    isOpenReplies: boolean;
}
