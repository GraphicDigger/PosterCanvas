export { commentEntityReducer } from './model';

export { CommentCard } from './ui/CommentCard';
export * from './ui/CommentList';
export * from './model';
export * from './type';

// Export missing hooks
export { useCommentQueries as useComments } from './model/hooks/useCommentQueries';
