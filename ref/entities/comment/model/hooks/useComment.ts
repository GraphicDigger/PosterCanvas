import { useSelector } from 'react-redux';
import { ENTITY_KINDS } from '@/shared/constants';
import { useScreens } from '../../../uiScreen';
import { useComponents } from '../../../uiComponent';
import {
  selectAllComments,
  selectSelectedComment,
  makeSelectCommentsByIds,
  selectAllCompositeComments,
  makeSelectCommentById,
  makeSelectCompositeCommentsByOwner,
  selectSelectedCommentId,
} from '../store';


interface Props {
    id?: string;
    ids?: string[];
    commentId?: string;
}

export const useComment = ({
  id,
  ids,
  commentId,
}: Props = {}) => {

  const { selectedScreen } = useScreens();
  const { selectedComponent } = useComponents();

  const allComments = useSelector(selectAllComments);

  const selectedComment = useSelector(selectSelectedComment);
  const selectedCommentId = useSelector(selectSelectedCommentId);

  const allCompositeComments = useSelector(selectAllCompositeComments);

  const compositeCommentsBySelectedScreen = useSelector(makeSelectCompositeCommentsByOwner(ENTITY_KINDS.SCREEN, selectedScreen?.id));
  const compositeCommentsBySelectedComponent = useSelector(makeSelectCompositeCommentsByOwner(ENTITY_KINDS.COMPONENT, selectedComponent?.id));

  const commentById = id ? useSelector(makeSelectCommentById(id)) : null;

  const commentsByIds = ids ? useSelector(makeSelectCommentsByIds(ids)) : [];

  return {

    allComments,
    allCompositeComments,
    compositeCommentsBySelectedScreen,
    compositeCommentsBySelectedComponent,

    selectedComment,
    selectedCommentId,

    commentById,
    commentsByIds,

  };
};

