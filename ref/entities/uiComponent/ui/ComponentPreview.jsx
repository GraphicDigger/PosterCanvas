import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemStartSlot,
} from '../../../shared/uiKit/List';
import { EditIcon } from '../../../shared/assets/icons';
import { useComponentStates } from '../model';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { Preview } from '../../../shared/uiKit/Preview';


export const ComponentPreview = ({
  component,
  onOpenComponentCanvas,
  onEditComponent,
}) => {

  const {
    handleHover,
    handleFocus,
    handleSelect,
    isSelected,
    isFocused,
    isHovered,
  } = useComponentStates(component?.id);

  const handleClick = (id) => {
    handleSelect(id);
    onOpenComponentCanvas();
  };

  return (
    <ListItem size={false}>
      <ListItemButton
        filled={false}
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={() => handleClick(component?.id)}
        onMouseEnter={() => handleHover(component?.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(component?.id)}
        onBlur={() => handleFocus(null)}
        padding={8}
      >
        <ListItemStartSlot>
          <Preview
            size='large'
            hasError={false}
          />
        </ListItemStartSlot>
        <ListItemText editable={true}>
          {component?.name || 'Component name'}
        </ListItemText>
        {(isHovered || isSelected) && onEditComponent && (
          <ButtonTool onClick={(e) => onEditComponent(e)}>
            <EditIcon />
          </ButtonTool>
        )}
      </ListItemButton>
    </ListItem>
  );
};

ComponentPreview.propTypes = {
  component: PropTypes.object.isRequired,
  onOpenComponentCanvas: PropTypes.func.isRequired,
  onOpenCodeEditor: PropTypes.func.isRequired,
};
