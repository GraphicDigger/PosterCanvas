import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemStartSlot,
  ListItemEndSlot,
} from '../../../shared/uiKit/List';
import { ComponentIcon } from '../../../shared/assets/icons';
import { useComponentStates, useComponentCodes } from '../model';
import { CodeIcon } from '../../../shared/assets/icons';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { DESIGN_MODES } from '../../mode/editorMode';
import { useFocusEntity } from '../../uiFocus';
import { useDesignMode } from '../../mode/editorMode';
import { useCodeStates } from '../../code';
import { CODE_LANG } from '../../code';


export const ComponentListItem = ({ component }) => {

  const {
    handleHover,
    handleFocus,
    handleSelect,
    isSelected,
    isFocused,
    isHovered,
  } = useComponentStates(component?.id);

  const { handleSelect: handleSelectCode } = useCodeStates();
  const { jsxCode } = useComponentCodes(component?.id);

  const { setFocused } = useFocusEntity();
  const {
    toggleCodeInDesignMode,
    setComponentCanvasInDesignMode,
  } = useDesignMode();

  const handleClick = (id) => {
    handleSelect(id);
    setComponentCanvasInDesignMode();
    handleSelectCode(jsxCode.id);
    setFocused({
      id: component.id,
      kind: component.kind,
    });
  };
  const handleOpenCode = (e) => {
    e.stopPropagation();
    handleSelect(component.id);
    handleSelectCode(jsxCode.id);
    setComponentCanvasInDesignMode();
    toggleCodeInDesignMode();
    setFocused({
      id: component.id,
      kind: component.kind,
    });
  };

  return (
    <ListItem>
      <ListItemButton
        filled={false}
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={() => handleClick(component.id)}
        onMouseEnter={() => handleHover(component.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(component.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemStartSlot>
          <ComponentIcon />
        </ListItemStartSlot>
        <ListItemText editable={true} >
          {component.name}
        </ListItemText>
        {(isHovered || isSelected) && (
          <ListItemEndSlot>
            <ButtonTool onClick={(e) => handleOpenCode(e)}>
              <CodeIcon />
            </ButtonTool>
          </ListItemEndSlot>
        )}
      </ListItemButton>
    </ListItem>
  );
};
