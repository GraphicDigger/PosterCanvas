import { useSelector } from 'react-redux';
import { ELEMENT_TAGS } from '@/entities/uiElement';
import {
  selectAllDefaultElements,
  selectSelectedDefaultElement,
  selectDefaultElementWithChildrenByTag,
  selectDefaultElementWithChildren,
} from '../store';

interface Props {
  tag?: string;
  elementId?: string;
}


export const useDefaultElementsSelectors = ({ tag, elementId }: Props = {}) => {

  const allDefaultElements = useSelector(selectAllDefaultElements);
  const selectedDefaultElement = useSelector(selectSelectedDefaultElement);

  const defaultElementWithChildren = useSelector(state => selectDefaultElementWithChildren(state, elementId));

  const defaultElementWithChildrenByTag = useSelector(state => selectDefaultElementWithChildrenByTag(state, tag));

  const divElement = useSelector(state => selectDefaultElementWithChildrenByTag(state, ELEMENT_TAGS.DIV));
  const paragraphElement = useSelector(state => selectDefaultElementWithChildrenByTag(state, ELEMENT_TAGS.PARAGRAPH));

  return {
    allDefaultElements,
    selectedDefaultElement,

    defaultElementWithChildren,

    defaultElementWithChildrenByTag,
    divElement,
    paragraphElement,
  };
};