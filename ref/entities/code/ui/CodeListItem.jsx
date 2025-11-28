import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemStartSlot,
  ListItemEndSlot,
} from '../../../shared/uiKit/List';
import { CodeIcon } from '../../../shared/assets/icons';
import { ENTITY_KINDS } from '../../../shared/constants';

import { useFocusEntity } from '../../uiFocus';
import { useDesignMode } from '../../mode/editorMode';
import { useCodeStates } from '../model/hooks/useCodeStates';


export const CodeListItem = ({ id, name, actionSlot }) => {

  const { setFocused } = useFocusEntity();
  const { setCodeInDesignMode } = useDesignMode();
  const {
    handleHover,
    handleFocus,
    handleSelect,
    isSelected,
    isFocused,
    isHovered,
  } = useCodeStates(id);

  const handleClick = (id) => {
    handleSelect(id);
    setFocused({ id, kind: ENTITY_KINDS.CODE });
    setCodeInDesignMode();
  };

  return (
    <ListItem>
      <ListItemButton
        filled={false}
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={() => handleClick(id)}
        onMouseEnter={() => handleHover(id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemStartSlot>
          <CodeIcon />
        </ListItemStartSlot>
        <ListItemText editable={true} >
          {name}
        </ListItemText>
        {isHovered && (
          <ListItemEndSlot>
            {actionSlot}
          </ListItemEndSlot>
        )}
      </ListItemButton>
    </ListItem>
  );
};

CodeListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
