import { useSelector } from 'react-redux';
import {
  selectAllHtmlAttrs,
  selectSelectedHtmlAttr,
  selectHtmlAttrsByIds,
} from '../store';


export const useHtmlAttrs = () => {

  const allHtmlAttrs = useSelector(selectAllHtmlAttrs);
  const selectedHtmlAttr = useSelector(selectSelectedHtmlAttr);

  return {
    allHtmlAttrs,
    selectedHtmlAttr,
  };
};

export const useHtmlAttrsByIds = (ids) => {
  const HtmlAttrs = useSelector(state => selectHtmlAttrsByIds(state, ids));

  return {
    HtmlAttrs,
  };
};

